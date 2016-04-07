
var createFileResult = function buildConfigFile( credentials ) {

	
    var util = require('util');
        
    var username = credentials.username;
    var pass    = credentials.pass;
    var siteId  = credentials.siteId;
    var configureScriptLocation = '..//configure.js';
        
	var cmd = 'node ' + configureScriptLocation + ' ' + username + ' ' + pass + ' ' + siteId;
	
    var response;

    run(cmd, function(message) {
        response = message;
    });

    while(response === undefined){
        
        require('deasync').runLoopOnce();
    }
    return response;
}

function run(cmd, cb){

    var exec = require('child_process').exec;
    var command = exec(cmd);
    
        
    var result = '';
    
    
    command.stdout.on('data', function(data){
       result += data.toString();        
    });
    
    command.on('close', function(code) {
        cb(result);
    });   
}


exports.createFileResult = createFileResult;