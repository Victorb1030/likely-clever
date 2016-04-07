var fs = require('fs');

var findResults = function() {
	var items;

    var configLocation = __dirname + '\\..\\..\\..\\etc\\config.json';
    
	try{
		items = fs.readFileSync(configLocation );
	} catch (e){
	
		if (e.code === 'ENOENT') {
			console.log('Unable to find file: ' + configLocation);
		} else {
			throw e;
		}	
	}
	
    var jsonObject;
    
    try{
        jsonObject = JSON.parse(items);
    }catch(e){
        
        throw e;
    }

    return jsonObject;
};

exports.findResults = findResults;