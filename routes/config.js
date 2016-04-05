var express = require('express');
var util    = require('util');
var findFile;
var saveJson;
var createConfig;

try{
	// check path of require
	findFile = require('../public/javascripts/model/getFile');
    
}
catch(e){
	console.log("Cant find getFile script current dir:" + __dirname + e);
}

try{
    saveJson = require('../public/javascripts/model/saveJson');
}
catch(e) {
    console.log("Can't find saveJson script, current dir:"+ __dirname + e);
    
}

try{
    //check path of require
    createFile = require('../public/javascripts/model/createConfig');
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

// Call external createConfig  module
// takes in params user/password/siteid
// waits to for success response from method
// returns success response uppon completion

router.post('/createConfig', function(req, res) {
    var createConfigResult;
    
    //console.log(JSON.stringify(req.body));
    
    createConfigResult = createFile.createFileResult(req.body);
    
    if( createConfigResult != true ){
        
        res.send({  
                error: "Error creating config file",
                status: 500,
        });
        
    }else {
    
        console.log("Create config result: " + createConfigResult);
        res.send({ 
            success: "Successfully created config",
            status: 200,
        });
    }
    
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
