
var http = require('http');
var fs   = require('fs');
var formidable = require("formidable");
var util = require('util');


var server = http.createServer(function (req, res) {
	
	if(req.method.toLowerCase() == 'get' ){
		
		displayForm(res);
		
	} else if (req.method.toLowerCase()  == 'post' ){
		
		//processAllFieldsOfTheForm(req, res);
		processFormFieldsIndividual(req, res);
	}
	
});


function displayForm(res) {
	fs.readFile('form.html', function (err, data) {
		res.writeHead(200, {
			'Content-Type': 'text/html',
				'Content-Length': data.length
				
		});		
		res.write(data);
		res.end();
		
	});
}

function processAllFieldsOfTheForm(req, res) {
	var form = new formidable.IncomingForm();
	
	form.parse(req, function (err, fields, files) {
		//execute the external program using the values in the form
		//return response to the application
		res.writeHead(200, {
			'content-type': 'text/plain'
		});
		res.write('Successfully created config file:\n\n');
		res.end(util.inspect({
			fields: fields,
		}));
			
	});
}


server.listen(1185);
console.log("server listening on 1185")