var fs = require('fs');

var findResults = function(setupConfig) {
	var items;
       
    //Read configLocation from setupConfig set in app.js
    var configLocation = __dirname + setupConfig.configLocation;
    
    if(configLocation == undefined){
        
        return{ error: "configLocation is not defined in appConfig"}
    }
    
	try{
		items = fs.readFileSync(configLocation );
	} catch (e){
	
		if (e.code === 'ENOENT') {
			return{ error:'Unable to find file: ' + configLocation };
            
		} else {
			return { error: "Error loading file at: " + configLocation};
		}	
	}
	
    var jsonObject;
    
    try{
        jsonObject = JSON.parse(items);
    }catch(e){
        
        return { error: "Unable to parse JSON in file: " + configLocation + " with " + e};
    }

    return jsonObject;
};

exports.findResults = findResults;