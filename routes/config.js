var express = require('express');
var util    = require('util');
var findFile;
var saveJson;
var createConfig;

try{
	// check path of require
	getFile = require('../lib/fileManipulation/GetFile');
    
}
catch(e){
	console.log("Cant find getFile script current dir:" + __dirname + e);
}

try{
    saveJson = require('../lib/fileManipulation/SaveJson');
}
catch(e) {
    console.log("Can't find saveJson script, current dir:"+ __dirname + e);
    
}

try{
    //check path of require
    createConfig = require('../lib/fileManipulation/CreateConfig');
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

	configJson = getFile.findResults(req.appConfig);
	
    if(configJson.error != undefined){
        
        res.send({error:configJson.error, status: '500'});
    }else {

        res.json(configJson);
    }      

});

// Call external createConfig  module
// takes in params user/password/siteid
// waits to for success response from method
// returns success response uppon completion

router.post('/createConfig', function(req, res) {
    var createConfigResult;
    
    //console.log(JSON.stringify(req.body));
    
    createConfigResult = createConfig.createFileResult(req.body, req.appConfig);
    
    console.log(util.inspect(createConfigResult.error));
    
    if(createConfigResult.error != undefined){
        
        res.send({msg:createConfigResult.error, status: '500'});
    }else {

        res.send({msg:createConfigResult, status: '200'});
    }            
});


/*
 * POST to save config file
 */
 
router.post('/modifyConfig', function(req, res) {
	
	var writeNewConfigResult;
    
    //console.log(util.inspect(req.body));
    
    writeNewConfigResult = saveJson.writeResult(req.body, req.appConfig);
    
    if(writeNewConfigResult.error != undefined){
        
        res.send({error:writeNewConfigResult.error, status: '500'});
    }else {

        res.send({success:writeNewConfigResult, status: '200'});
    }      
  
});

module.exports = router;
