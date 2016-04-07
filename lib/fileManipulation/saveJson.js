var fs = require('fs');
var util = require('util');

var writeResult = function(jsonObject) {
    var jsonString;
    var configLocation = __dirname + '\\..\\..\\..\\etc\\config.json';
  
    if(typeof(jsonObject) != 'object' ){
        
        console.error("jsonObject not a defined object");
        return false;
    }
    
    var jsonString = "";
    
    for(var key in jsonObject){
        
        jsonString = key;
    }
  
  
  	try{
        var jsonItem = JSON.parse(jsonString);
	    console.log("JSON:" + JSON.stringify(jsonItem,null,2));
        
        
	} catch (e){
	
		console.log('Unable to save file with: ' + e);
        throw e;
	}
   
    try{
      fs.writeFile( configLocation, JSON.stringify(jsonItem,null,2));  
    
    }catch(e){
        
       throw e; 
    }
      
	return true;
};

exports.writeResult = writeResult;