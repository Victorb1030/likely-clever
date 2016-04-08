
var createFileResult = function buildConfigFile( credentials, appConfig ) {
	
    var util = require('util');
        
    //Input validation    
        
    if(typeof(credentials) != 'object'){

        return {error:"credententials in not a defined object"};
    
    }else if(typeof(appConfig) != 'object'){
    
        return {error:"appConfig is not a defined object"};
        
    }else if(appConfig.configureScriptLocation == undefined){
        
        return {error:"configureScriptLocation is undefined in config"};
        
    }else if(appConfig.scriptWorkingDirectory == undefined){
        
        return {error:"scriptWorkingDirectory is undefined in config"};
    }
    //  /input validation
    
    //set input parameters
    var username = credentials.username;
    var pass    = credentials.pass;
    var siteId  = credentials.siteId;
    var configureScriptLocation = String(appConfig.configureScriptLocation);
    //  /set input parameters
        
    
	var cmd = 'node ' + configureScriptLocation + ' ' + username + ' ' + pass + ' ' + siteId;
	
    console.log(cmd);
    
    var response;

    var cwdir = appConfig.scriptWorkingDirectory;
    
    run(cmd, cwdir, function(message) {
        response = message;
    });

    while(response === undefined){
        
        require('deasync').runLoopOnce();
    }
    return response;
}

function run(cmd, cwdir, cb){

    var exec = require('child_process').exec;
    
    var command = exec(cmd, {cwd:cwdir});
            
    var result = '';
        
    command.stdout.on('data', function(data){
       result += data.toString();        
    });
    
    command.on('close', function(code) {
        cb(result);
    });   
}


exports.createFileResult = createFileResult;