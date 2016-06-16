var expect		= require('chai').expect,
	Ziplink		= require('../../models/Ziplink.js'),
	request		= require('request'),
	server		= require('../../bin/www')
	;

var URL = "http://localhost:3000/";

describe('index.js routes', function(){

	describe('Front Page', function(){

		it('returns status 200', function(done){
			request(URL, function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

	});

});