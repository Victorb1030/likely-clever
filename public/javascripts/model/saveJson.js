var fs = require('fs');
var util = require('util');

var writeResult = function(jsonObject) {
    var jsonString;
    var writeResult;
  
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
   

   	writeResult = fs.writeFile('./public/json/etc/config.json', JSON.stringify(jsonItem,null,2), (err) => {
        if(err) throw err;
        console.log('Saved modified config file');
    });

    
	return true;
};

exports.writeResult = writeResult;