var expect		= require('chai').expect,
	Ziplink		= require('../../models/Ziplink.js'),
	request		= require('request')
	;

var ROOT_URL = 'http://localhost:3000/debug/';
var ALL_URL = ROOT_URL + 'all'



describe('debug.js routes', function(){

	describe('All Ziplinks', function(){

		it('returns status 200', function(done){
			request(ALL_URL , function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

	});

});

