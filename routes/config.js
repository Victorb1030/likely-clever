var express = require('express');

var findFile;
var saveJson;
var createConfig;

try{
	// check path of require
	findFile = require('../public/javascripts/getFile');
    
}
catch(e){
	console.log("Cant find getFile script current dir:" + __dirname + e);
}

try{
    saveJson = require('../public/javascripts/saveJson');
}
catch(e) {
    console.log("Can't find saveJson script, current dir:"+ __dirname + e);
    
}

try{
    //check path of require
    createFile = require('../public/javascripts/createConfig');
}
catch(e){
    console.log("Can't find createConfig script, current dir:"+ __dirname + e);
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

// TODO router.post('/createConfig', function(req,res) {
// Add resource to call external createConfig ******* CreateConfig module
// takes in params user/password/siteid
// waits to for success response from method
// returns success response uppon completion

router.post('/createConfig', function(req, res) {
    var createConfigResult;
    
    console.log(JSON.stringify(req.body));
    
    createConfigResult = createFile.createFileResult(req.body);
    
    if(createConfigResult != true){
        
        res.send(
            {  msg: "Error creating config file" }
        );
    }
    
    console.log("Create config result: " + createConfigResult);
    
    
});


/*
 * POST to.
 *  ******************* SaveConfig module
router.post('/adduser', function(req, res) {
	
	TODO setup to call external writeJson file
	
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
