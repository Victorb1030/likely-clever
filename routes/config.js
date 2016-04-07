var express = require('express');
var util    = require('util');
var findFile;
var saveJson;
var createConfig;

try{
	// check path of require
	getFile = require('../lib/fileManipulation/getFile');
    
}
catch(e){
	console.log("Cant find getFile script current dir:" + __dirname + e);
}

try{
    saveJson = require('../lib/fileManipulation/saveJson');
}
catch(e) {
    console.log("Can't find saveJson script, current dir:"+ __dirname + e);
    
}

try{
    //check path of require
    createConfig = require('../lib/fileManipulation/createConfig');
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

	configJson = getFile.findResults();
		
	//console.log("Config JSON: " + configJson);
	
	res.json(configJson);
		
});

// Call external createConfig  module
// takes in params user/password/siteid
// waits to for success response from method
// returns success response uppon completion

router.post('/createConfig', function(req, res) {
    var createConfigResult;
    
    //console.log(JSON.stringify(req.body));
    
    createConfigResult = createConfig.createFileResult(req.body);
  
    //console.log(util.inspect(createConfigResult));
    

    res.send({success:createConfigResult, status: '200'});
});


/*
 * POST to save config file
 */
 
router.post('/modifyConfig', function(req, res) {
	
	var writeNewConfigResult;
    
    console.log(util.inspect(req.body));
    
    writeNewConfigResult = saveJson.writeResult(req.body);
    
    if( writeNewConfigResult != true ){
        
        console.log('Error creating config file');
        res.send({  
            error: "Error creating config file in route",
            status: '500',
        });    
        
    }else {
    
        console.log("Write config result: " + writeNewConfigResult);
        res.send({ 
            success:'Successfully modified config',
            status: '200',
        });
    }        
});

module.exports = router;
