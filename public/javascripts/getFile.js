var fs = require('fs');

var findResults = function() {
	var items;

	try{
		items = fs.readFileSync('./public/json/etc/config.json');
	} catch (e){
	
		if (e.code === 'ENOENT') {
			console.log('File not found!');
		} else {
			throw e;
		}	
	}
	
	return JSON.parse(items);
};

exports.findResults = findResults;