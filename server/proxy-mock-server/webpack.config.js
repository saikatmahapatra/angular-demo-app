const path = require('path');

module.exports = {
    entry: './server.js',
    output: {
        filename: 'server.bundle.js'
    },
    target: 'node'
};