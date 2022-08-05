var express = require('express'),
    _ = require("underscore"),
    path = require("path"),
    fs = require("fs"),
    bodyParser = require("body-parser"),
    apiMocker = {},
    jsonPath = require('JSONPath'),
    util = require('util'),
    https = require('https'),
    querystring = require('querystring'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    btoa = require('btoa'),
    proxy = require('express-http-proxy'),
    tunnel = require('tunnel'),
    fileUpload = require('express-fileupload');

apiMocker.defaults = {
    "port": "8888",
    "mockDirectory": "./responses/",
    "allowedDomains": ["http://localhost:4200"],
    "allowedHeaders": ["Content-Type", "Accept-Language", "channelId", "countrycode"],
    "allowedHeaders": ["Access-Control-Allow-Credentials", "true"],
    "webServices": {}
};

apiMocker.createServer = function(options, config) {
    options = options || {};
    apiMocker.express = express();

    apiMocker.options = _.defaults(options, apiMocker.defaults);

    apiMocker.log = function(msg) {
        if (!apiMocker.options.quiet) {
            console.log(msg);
        }
    };
    apiMocker.setConfigFile(config);
    apiMocker.loadConfigFileProxyRules();
    apiMocker.express.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
    apiMocker.express.use(bodyParser.json({ limit: '5mb' }));
    apiMocker.express.use(apiMocker.corsMiddleware);
    apiMocker.express.use(cookieParser());
    apiMocker.express.use(fileUpload());
    apiMocker.express.use(session({
        secret: 'qwert1234',
        resave: false,
        saveUninitialized: true,
        cookie: { Path: "/" }
    }));
    apiMocker.router = express.Router();
    apiMocker.express.use(apiMocker.router);

    return apiMocker;
};

apiMocker.setConfigFile = function(file) {
    if (!file) {
        return apiMocker;
    } else if (path.sep !== file.substr(0, 1)) {
        // relative path from command line
        apiMocker.configFilePath = path.resolve(process.cwd(), file);
    } else {
        apiMocker.configFilePath = file;
    }
    return apiMocker;
};

apiMocker.loadConfigFileProxyRules = function() {
    if (apiMocker.configFilePath) {
        // apiMocker.log("Loading config file: " + apiMocker.configFilePath);
        // Switched to use fs.readFileSync instead of "require"
        // this makes testing easier, and avoids messing with require cache.
        var newOptions = _.clone(apiMocker.defaults),
            configJson = JSON.parse(fs.readFileSync(apiMocker.configFilePath));
        newOptions = _.extend(newOptions, apiMocker.options, configJson);
        // console.log("util:::" + util.inspect(newOptions, false, null));
        // console.log("JSON stringify::" +JSON.stringify(newOptions));
        apiMocker.addSubAppModule(newOptions.webServices, configJson.subAppModules)
        apiMocker.options = newOptions;
        apiMocker.options.webServices = apiMocker.normalizeWebServicesConfig(apiMocker.options.webServices);

        // console.log("Webservices" +util.inspect(apiMocker.options.webServices,
        // false, null));
        apiMocker.setProxyRoutes(apiMocker.options.webServices);
    } else {
        apiMocker.log("No config file path set.");
    }
};

apiMocker.loadConfigFile = function() {
    if (apiMocker.configFilePath) {
        // apiMocker.log("Loading config file: " + apiMocker.configFilePath);
        // Switched to use fs.readFileSync instead of "require"
        // this makes testing easier, and avoids messing with require cache.
        var newOptions = _.clone(apiMocker.defaults),
            configJson = JSON.parse(fs.readFileSync(apiMocker.configFilePath));
        newOptions = _.extend(newOptions, apiMocker.options, configJson);
        // console.log("util:::" + util.inspect(newOptions, false, null));
        // console.log("JSON stringify::" +JSON.stringify(newOptions));
        apiMocker.addSubAppModule(newOptions.webServices, configJson.subAppModules)
        apiMocker.options = newOptions;
        apiMocker.options.webServices = apiMocker.normalizeWebServicesConfig(apiMocker.options.webServices);

        // console.log("Webservices" +util.inspect(apiMocker.options.webServices,
        // false, null));
        apiMocker.setRoutes(apiMocker.options.webServices);
    } else {
        apiMocker.log("No config file path set.");
    }
};

apiMocker.addSubAppModule = function(webServices, subAppModules) {
    for (var subAppModule in subAppModules) {
        console.log("processing sub app modules : " + subAppModules[subAppModule]);
        var subAppModuleConfigJSON = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), subAppModules[subAppModule])));
        if (subAppModuleConfigJSON != null) {
            for (var subAppWebService in subAppModuleConfigJSON.webServices) {
                if (!webServices.hasOwnProperty(subAppWebService)) {
                    webServices[subAppWebService] = subAppModuleConfigJSON.webServices[subAppWebService];

                } else {

                    console.log("Duplicate webservice config: " + subAppWebService);
                }
            }
        }
    }

}

apiMocker.normalizeWebServicesConfig = function(webServices) {
    var topLevelKeys = _.keys(webServices),
        newWebServices = {};
    // console.log("Top Level Keys::: " + util.inspect(topLevelKeys, false,
    // null));
    // console.log("Top Level Keys[0]::: " +
    // util.inspect(webServices[topLevelKeys[0]], false, null));
    // console.log("Top Level Keys[0] mockfile ::: " +
    // util.inspect(webServices[topLevelKeys[0]].mockFile, false, null));
    if (webServices[topLevelKeys[0]] && webServices[topLevelKeys[0]].mockFile) {
        return webServices;
    } else if (webServices[topLevelKeys[0]] && webServices[topLevelKeys[0]].host) {
        return webServices;
    } else {
        apiMocker.log("WARNING: apimocker config file format is deprecated.");
        _.each(topLevelKeys, function(verb) {
            var newSvc, serviceKeys = _.keys(webServices[verb]);
            _.each(serviceKeys, function(key) {
                if (newWebServices[key]) {
                    newSvc = newWebServices[key];
                    newSvc.verbs[newSvc.verbs.length] = verb;
                } else {
                    newWebServices[key] = {
                        "mockFile": webServices[verb][key],
                        "verbs": [verb]
                    };
                }
            });
        });
        return newWebServices;
    }
};

apiMocker.setProxyRoutes = function(webServices) {
    var topLevelKeys = _.keys(webServices);
    _.each(topLevelKeys, function(key) {
        var svc = _.clone(webServices[key]);
        // apiMocker.log("about to add a new service: " + JSON.stringify(svc));
        // console.log("SVC :::" + util.inspect(svc, false, null));
        if (svc.host && !svc.default) {
            apiMocker.setProxy(svc, key);
        }
    });
};

apiMocker.setRoutes = function(webServices) {
    var topLevelKeys = _.keys(webServices);
    _.each(topLevelKeys, function(key) {
        var svc = _.clone(webServices[key]);
        apiMocker.log("about to add a new service: " + JSON.stringify(svc));
        ///console.log("SVC :::" + util.inspect(svc, false, null));
        if (svc.host && svc.default) {
            apiMocker.setProxy(svc, key);
        } else {
            _.each(svc.verbs, function(v) {
                apiMocker.setRoute(apiMocker.getServiceRoute(key, v));
            });
        }
    });
};

apiMocker.setProxy = function(svc, key) {
    console.log("Registering proxy " + svc.host + " for routes " + key);

    apiMocker.express.use(key, proxy(svc.host, {
        proxyReqPathResolver: function(req) {

            if (svc.replacePath) {
                var dynamicParamValue = '';

                var switches = svc.switch;
                if (!(switches instanceof Array)) {
                    switches = [switches];
                }

                switches.forEach(function(s) {
                    var switchParamValue = '';
                    if (req.param(s)) { // query param in get request
                        switchParamValue = encodeURIComponent(req.param(s));
                    }

                    if (switchParamValue) {
                        dynamicParamValue = dynamicParamValue + '/' + switchParamValue;
                    }
                });

                return svc.replacePath + dynamicParamValue;
            }

            var basePath = '';
            if (svc.basePath) {
                basePath = svc.basePath;
            }
            var url = require('url').parse(req.originalUrl).path;
            if (url === null) {
                url = '/';
            }
            console.log("forward:: " + url + " to:: " + svc.host);
            return basePath + url;
        },
        ///tunnelingAgent
        proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
            return new Promise(function(resolve, reject) {
                proxyReqOpts.rejectUnauthorized = false;
                if (svc.webproxy_host && svc.webproxy_port) {
                    var tunnelingAgent = tunnel.httpsOverHttp({
                        proxy: {
                            host: svc.webproxy_host,
                            port: svc.webproxy_port
                        }
                    });
                    proxyReqOpts.agent = tunnelingAgent;
                }
                resolve(proxyReqOpts);
            })
        }
    }));
}

apiMocker.getServiceRoute = function(path, verb) {

    var finalSvc = _.clone(apiMocker.options.webServices[path]);
    finalSvc.verb = verb.toLowerCase();
    finalSvc.serviceUrl = path;
    if (finalSvc.responses) {
        finalSvc = _.extend(finalSvc, finalSvc.responses[verb]);
        finalSvc.host = _.has(finalSvc.responses[finalSvc.verb], 'hostURL') || '<No Host>';
        finalSvc.path = _.has(finalSvc.responses[finalSvc.verb], 'hostPath') || '<No Path>';
    }
    if (typeof finalSvc.latency === "undefined") {
        finalSvc.latency = apiMocker.options.latency ? apiMocker.options.latency : 0;
    }
    finalSvc.httpStatus = finalSvc.httpStatus || 200;

    //  console.log("Initial finalSvc :::" + util.inspect(finalSvc, false,
    // null));
    delete finalSvc.responses;
    delete finalSvc.verbs;
    //  console.log("Final Sourav finalSvc :::" + util.inspect(finalSvc, false,
    //  null));
    return finalSvc;
};

apiMocker.sendResponse = function(req, res, serviceKeys) {

    /*
     * console.log("Service keys::: " + util.inspect(serviceKeys, false, null));
     *
     * console.log("params:::" + _.keys(req.params)); console.log("body:::" +
     * _.keys(req.body)); console.log("query:::" + _.keys(req.query));
     * console.log("request::"+ _.pairs(req.body)); console.log("headers::"+
     * _.keys(req.headers)); console.log("headers::"+ req.headers.authorization);
     */


    var originalOptions, mockPath;
    // we want to look up the service info from our in-memory "webServices"
    // every time.
    var options = apiMocker.getServiceRoute(serviceKeys.serviceUrl, serviceKeys.verb);
    // console.log("New service route: " + JSON.stringify(options));

    // console.log("Options::: " + util.inspect(options, false, null));

    setTimeout(function() {

        if (options.httpStatus === 204 || options.httpStatus === 304) {
            // express handles these two differently - it strips out body,
            // content-type, and content-length headers.
            // there's no body or content-length, so we just send the status code.
            apiMocker.log("Returning http status: " + options.httpStatus);
            res.send(options.httpStatus);
            return;
        }
        if (options.switch) {
            options = _.clone(options);
            originalOptions = _.clone(options);
            apiMocker.setSwitchOptions(options, req);
            if (!options.dir) {
                mockPath = path.join(apiMocker.options.mockDirectory, options.mockFile);
            } else {
                mockPath = path.join(apiMocker.options.mockDirectory, options.dir, options.mockFile);
            }

            if (!fs.existsSync(mockPath)) {
                apiMocker.log("No file found: " + options.mockFile + " attempting base file: " + originalOptions.mockFile);
                // options = originalOptions;
                options.mockFile = originalOptions.mockFile;
            }
        }

        if (options.hostURL) {

            var headerData = options.headers;
            if (_.has(headerData, "authorization-basic")) {
                // console.log('sdds'+headerData["authorization-basic"])
                headerData.Authorization = "Basic " + btoa(headerData["authorization-basic"]);
                delete headerData["authorization-basic"];
            }
            if ('' != req.headers.authorization && undefined != req.headers.authorization) {
                console.log(req.headers.authorization);
                headerData.Authorization = req.headers.authorization;
            }

            var post_data = querystring.stringify(req.body);
            console.log("post data:: " + post_data);
            headerData["Content-Length"] = post_data.length;
            // console.log('Header Data'+ util.inspect(headerData, false, null));

            var post_options = {
                host: options.hostURL,
                path: options.hostPath,
                method: 'POST',
                headers: headerData,
                rejectUnauthorized: false
            };
            var post_req = https.request(post_options, function(response) {
                response.setEncoding('utf8');
                var dataset = '';
                response.on('data', function(chunk) {
                    console.log('Response Data: ' + chunk);
                    dataset += chunk;
                    // res.end(chunk);
                });
                response.on('end', function() {
                    console.log("Close received!");
                    res.end(dataset);
                });
            });

            post_req.write(post_data);
            post_req.end();

        } else {
            //in case of few  flows there will 2 calls with same req
            //first only for validatin and second for actual confirmation
            if (options.checkValidationFlag) {
                if (req.body.validationFlag) {
                    options.mockFile = options.mockFile + "_verify.json";
                } else {
                    options.mockFile = options.mockFile + "_confirm.json";
                }
            }
            if (!options.dir) {
                mockPath = path.join(apiMocker.options.mockDirectory, options.mockFile);
            } else {
                mockPath = path.join(apiMocker.options.mockDirectory, options.dir, options.mockFile);
            }
            apiMocker.log("Returning mock: " + options.verb.toUpperCase() + " " + options.serviceUrl + " : " +
                options.mockFile + " mockpath:: " + mockPath);

            if (options.contentType) {
                res.header('Content-Type', options.contentType);
                fs.readFile(mockPath, { encoding: "utf8" }, function(err, data) {
                    if (err) {
                        throw err;
                    }
                    var buff = new Buffer(data, 'utf8');
                    res.status(options.httpStatus).send(buff);
                });
            } else {
                console.log("test mock:::- " + mockPath + " " + options.mockFile);
                res.status(options.httpStatus).sendFile(encodeURIComponent(options.mockFile), { root: apiMocker.options.mockDirectory });
            }
        }
    }, options.latency);

};

// only used when there is a switch configured
apiMocker.setSwitchOptions = function(options, req) {
    var switchFilePrefix = "",
        switchParamValue,
        mockFileParts, mockFilePrefix = "",
        mockFileBaseName;

    var switches = options.switch;
    if (!(switches instanceof Array)) {
        switches = [switches];
    }

    switches.forEach(function(s) {
        switchParamValue = null;
        if (req.body[s]) { // json post request
            switchParamValue = encodeURIComponent(req.body[s]);
        } else if (req.param(s)) { // query param in get request
            switchParamValue = encodeURIComponent(req.param(s));
        }

        if (!switchParamValue && (s.indexOf("$.") === 0)) {
            // use JsonPath - use first value found if multiple occurances exist
            var allElems = jsonPath.eval(req.body, s); // jshint ignore:line
            if (allElems.length > 0) {
                switchParamValue = encodeURIComponent(allElems[0]);
            }
        }

        if (switchParamValue) {
            switchFilePrefix = switchFilePrefix + s + switchParamValue;
        }
    });

    if (!switchFilePrefix) {
        return;
    }

    if (options.switchResponses && options.switchResponses[switchFilePrefix]) {
        _.extend(options, options.switchResponses[switchFilePrefix]);
        if (options.switchResponses[switchFilePrefix].mockFile) {
            return;
        }
    }

    mockFileParts = options.mockFile.split("/");
    mockFileBaseName = mockFileParts.pop();
    if (mockFileParts.length > 0) {
        mockFilePrefix = mockFileParts.join("/") + "/";
    }
    options.mockFile = mockFilePrefix + switchFilePrefix + "." + mockFileBaseName;
};

// Sets the route for express, in case it was not set yet.
apiMocker.setRoute = function(options) {
    var displayFile = options.mockFile || "<no mockFile>",
        displayLatency = options.latency ? options.latency + " ms" : "";
    options.httpStatus = options.httpStatus || 200;
    apiMocker.router[options.verb]("/" + options.serviceUrl, function(req, res) {

        apiMocker.sendResponse(req, res, options);
    });
    apiMocker.log("Set route: " + options.verb.toUpperCase() + " " + options.serviceUrl + " : " +
        displayFile + " " + displayLatency);
    if (options.switch) {
        apiMocker.log("   with switch on param: " + options.switch);
    }
};

// CORS middleware
apiMocker.corsMiddleware = function(req, res, next) {
    var allowedHeaders = apiMocker.options.allowedHeaders.join(',');
    res.header('Access-Control-Allow-Origin', apiMocker.options.allowedDomains);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', allowedHeaders);

    next();
};

apiMocker.start = function(port) {
    apiMocker.loadConfigFile();
    port = port || apiMocker.options.port;
    if (apiMocker.options.staticDirectory && apiMocker.options.staticPath) {
        apiMocker.express.use(apiMocker.options.staticPath, express.static(apiMocker.options.staticDirectory));
    }
    apiMocker.expressInstance = apiMocker.express.listen(port);
    apiMocker.log("Mock server listening on port " + port);
    return apiMocker;
};

apiMocker.stop = function() {
    if (apiMocker.expressInstance) {
        apiMocker.log("Stopping mock server.");
        apiMocker.expressInstance.close();
    }
    return apiMocker;
};

// expose all the "public" methods.
exports.createServer = apiMocker.createServer;
exports.start = apiMocker.start;
exports.setConfigFile = apiMocker.setConfigFile;
exports.stop = apiMocker.stop;


/** ** starting it on node ** */
var commander = require("commander")
commander.option("-c, --config <path>", "Path to config.json file.", path.resolve(".", "config.json"))
    .option("-q, --quiet", "Disable console logging")
    .option("-p, --port <port>", "Port that the http mock server will use. Default is 8888.", "8888")
    .parse(process.argv);

var options = {};
options.port = commander.port;
options.quiet = !!commander.quiet;
var apiMocker = apiMocker.createServer(options, commander.config)
    //.setConfigFile(commander.config)
    .start();