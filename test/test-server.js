var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js');
var should = chai.should();
var expect = chai.expect;
var createConfig = require('../lib/fileManipulation/CreateConfig');

chai.use(chaiHttp);

describe('Config', function(){
	it('should list a single config on /config/config GET');
	it('should create config on /config/createConfig POST');
	it('should update config on /config/modifyConfig POST');
});

it('should list a single config on /config/config GET', function(done) {
	
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

/*
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
*/


it('should update config on /config/modifyConifg POST', function(done){

	chai.request(server)
		.post('/config/modifyConfig')
		.send({})
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







