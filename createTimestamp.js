var fs = require('fs');
var timeString = new Date().toLocaleString();
fs.writeFile('timestamp.json', '{"buildTime":"'+timeString+'"}', function(err){
    if(err) {
        throw err
    } else {
        console.log("timestamp file created");
    }
});