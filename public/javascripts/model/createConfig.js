const exec = require('child_process').exec;
var util = require('util');

var createFileResult = function buildConfigFile( credentials ) {
	
    var username = credentials.username;
    var pass     = credentials.pass;
    var siteId  = credentials.siteId;
    
	var command = 'node configure.js ' + username + ' ' + pass + ' ' + siteId;
	
	console.log(command);
    
	const child = exec( command ,
		( error, stdout, stderr ) => {
			console.log(`stdout: ${stdout}`);
			console.log(`stderr; ${stderr}`);
			
			if( error !== null ) {
				console.log(`exec error: ${error}`);
                return `${error}`;
			}
	});
    return true;      
}

exports.createFileResult = createFileResult;