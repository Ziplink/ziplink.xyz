var expect		= require('chai').expect,
	Ziplink		= require('../../models/Ziplink.js'),
	request		= require('request'),
	server		= require('../../bin/www')
	;

var ROOT_URL = "http://localhost:3000/";

/**
 *	Test Ziplink data
 */
var TEST_ZIPLINK_TEMPLATE = {
		//Set a random name each run so we don't accidentally get positive results
		name: 'TestName' + Math.random(),
		sublinks: [
			{
				url: 'www.google.com'
			}
		]
	};

var testZiplinkID;


describe('index.js routes', function(){

	describe('Front Page', function(){

		it('returns status 200', function(done){
			request(ROOT_URL, function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

	});

	describe('Ziplink View Page', function(done){

		//Setup database to test View page
		before(function(done){
			Ziplink.emptyDB(function(err){
				//If there's an error emptying the database, the model is broken
				if(err) return done(err);
				Ziplink.createZiplinkFromTemplate(TEST_ZIPLINK_TEMPLATE, function(err, ziplink){
					//If there's an error creating the ziplink with this method, the model is broken
					if(err) return done(err);
					testZiplinkID = ziplink.getEncodedID();
					done();
				});
			});
		});

		it('returns status 200', function(done){
			request(ROOT_URL + testZiplinkID, function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});

});