var express = require('express');

var findFile;

try{
	// check path of require
	findFile = require('../public/javascripts/getFile');
}
catch(e){
	console.log("Cant find file current dir:" + __dirname);
	
}


var router = express.Router();


/*
 * GET config.
 */
router.get('/config', function(req, res) {
    var configJson;

	configJson = findFile.findResults();
		
	//console.log("Config JSON: " + configJson);
	
	res.json(configJson);
		
});




/*
 * POST to.
 *
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});
*/

module.exports = router;
