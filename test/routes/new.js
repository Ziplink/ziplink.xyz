var expect		= require('chai').expect,
	Ziplink		= require('../../models/Ziplink.js'),
	request		= require('request')
	;

var ROOT_URL = "http://localhost:3000/new";

var ZIPLINK_POST_FORM_TEMPLATE = {
		//Set a random name each run so we don't accidentally get positive results
		name: 'TestName' + Math.random(),
		sublinks: [
			{
				url: 'www.google.com'
			}
		]
	};

var newZiplinkID;

describe('new.js routes', function(){

	describe('New Ziplink Form', function(){
		it('returns status 200', function(done){
			request(ROOT_URL, function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});

	describe('New Ziplink Post', function(){

		//Empty database so we're working from a blank slate
		before(function(done){
			Ziplink.emptyDB(done);
		});

		//Post a new Ziplink to the /new route
		it('returns status 302, returns valid redirect', function(done){
			request.post({
				url: ROOT_URL,
				form: ZIPLINK_POST_FORM_TEMPLATE,
			},
			function(err, response, body){
				expect(response.statusCode).to.equal(302);

				//Store the newZiplinkID, removing the leading '/'
				newZiplinkID = response.headers.location.slice(1);
				expect(newZiplinkID).to.have.length.above(0);

				done();
			});
		});

		it('is saved to the database', function(done){
			Ziplink.findByEncodedID(newZiplinkID, function(err, ziplink){
				expect(ziplink).to.exist;
				expect(ziplink.name).to.equal(ZIPLINK_POST_FORM_TEMPLATE.name);
				expect(ziplink.sublinks.length).to.equal(ZIPLINK_POST_FORM_TEMPLATE.sublinks.length);
				done(err);
			});
		});

	});

});

