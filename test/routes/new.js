var expect		= require('chai').expect,
	Ziplink		= require('../../models/Ziplink.js'),
	request		= require('request')
	;

var URL = "http://localhost:3000/new";

var ZIPLINK_POST_FORM_TEMPLATE = {
		name: 'Test',
		sublinks: [
			{
				url: 'www.google.com'
			}
		]
	};

describe('new.js routes', function(){

	describe('New Ziplink Post', function(){

		it('returns status 200', function(done){
			request.post({
				url: URL,
				form: ZIPLINK_POST_FORM_TEMPLATE,
			},
			function(err, response, body){
				expect(response.statusCode).to.equal(302);
				done();
			});
		});

	});

});

