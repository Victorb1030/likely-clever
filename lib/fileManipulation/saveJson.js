var fs = require('fs');
var util = require('util');

var writeResult = function(jsonObject, appConfig) {
    var jsonString;
    
    if(typeof(appConfig) != 'object'){
        
        return{ error: "appConfig is not defined in saveJson"};
 
    }else if(appConfig.configLocation == undefined){
        
        return{ error: "configLocation is not defined in appConfig"};
    }
    
    
    var configLocation = __dirname + String(appConfig.configLocation);
  
    if(typeof(jsonObject) != 'object' ){
        
        return{ error: "jsonObject is not defined in saveJson()"};
    }
    
    var jsonString = "";
    
    for(var key in jsonObject){
        
        jsonString = key;
    }
  
  
  	try{
        var jsonItem = JSON.parse(jsonString);
	    //console.log("JSON:" + JSON.stringify(jsonItem,null,2));
          
	} catch (e){
	
		console.log('Unable to parse json file with: ' + e);
        return{error: "Unable to parse json config file" };
	}
   
    try{
      fs.writeFile( configLocation, JSON.stringify(jsonItem,null,2));  
    
    }catch(e){
        
        console.log("Unable to write file to: " + configLocation);
        return{ error: "Unable to save changes to config.json"};
    }
      
	return true;
};

exports.writeResult = writeResult;