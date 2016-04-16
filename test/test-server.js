var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js');
var should = chai.should();
var expect = chai.expect;
var createConfig = require('../lib/fileManipulation/CreateConfig');
var fs = require('fs');

var util = require('util');

var configLocation = 'test/testConfig/config.json';

var testConfig = fs.readFileSync(configLocation);

var jsonConfig = JSON.parse(testConfig);

chai.use(chaiHttp);

describe('Config', function(){
	it('should list a config on /config/config GET');
	it('should create config on /config/createConfig POST');
	it('should update config on /config/modifyConfig POST');
});

it('should list a config on /config/config GET', function(done) {
	
	chai.request(server)
		.get('/config/config')
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.connection.should.be.a('object');
			res.body.site.should.be.a('object');
			done();
		});

});

it('should create config on /config/createConfig POST', function(done){

	this.timeout(10000);

	chai.request(server)
		.post('/config/createConfig')
		.send({pass:'davisfuels',siteId:'1',username:'davisfuels'})
		.end(function(err, res){

			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.property('status');
			res.body.should.have.property('msg');
			done();
		});

});


it('should update config on /config/modifyConifg POST', function(done){

	chai.request(server)
		.post('/config/modifyConfig')
		.send(JSON.stringify(jsonConfig))
		.end(function(err, res){
			
			res.should.have.status(200);

			done();
		});

});

describe('CreateConfig', function() {
	it('createFileResult() should return string of script output', function() {
	
		this.timeout(400);

		var credentials = { 
			username : 'davisfuels',
			pass: 'davisfuels',
			siteId: 1
		};

		var config = {
			configureScriptLocation: '/configure.js'
		};


		expect(createConfig.createFileResult(credentials, config)).to.be.a('object');
	
	});

});



describe('GetFile', function(){
	it('findResults() should return a json object containing config data', function(){
	
	
		var config = {
		
			configLocation : '/../../test/testConfig/config.json'
		};
		
	
		expect(getFile.findResults(config)).to.be.a('object');

		// Verify contents of config file


		

		console.log(util.inspect(getFile.findResults(config)));
	
	});



});



