var fs = require('fs');

var writeResult = function(jsonObject) {
    var jsonString;
    var writeResult;
  
    if(typeof(jsonObject) != 'object' ){
        
        console.error("jsonObject not a defined object");
        return false;
    }
  
	try{
        jsonString = JSON.stringify(jsonObject, null, 4);
	        
	} catch (e){
	
		console.log('Unable to save file with: ' + e);
        throw e;
	}
    
   	writeResult = fs.writeFile('./public/json/etc/config.json', jsonString, (err) => {
        if(err) throw err;
        console.log('Saved modified config file');
    });
	
	return true;
};

exports.writeResults = writeResult;