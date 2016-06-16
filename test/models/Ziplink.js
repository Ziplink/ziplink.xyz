var dbURI		= 'mongodb://localhost/ziplink',
	expect		= require('chai').expect,
	mongoose	= require('mongoose'),
	Ziplink		= require('../../models/Ziplink.js'),
	clearDB		= require('mocha-mongoose')(dbURI, {noClear: true})
	;



describe('Standard Ziplink with 1 sublink', function(){

	var ziplinkTemplate = {
		name: 'SingleTest',
		sublinks: [
			{
				url: 'www.google.com'
			}
		]
	};

	before(function(done){
		if(mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	before(function(done) {
		Ziplink.emptyDB(done);
	});



	it('can be saved', function(done){
		Ziplink.createZiplinkFromTemplate(ziplinkTemplate, function(err, ziplink){
			done(err);
		});
	});

	it('can be retrieved by encoded ID', function(done){
		Ziplink.findByEncodedID('b', function(err, ziplink){
			expect(ziplink).to.exist;
			expect(ziplink.name).to.equal(ziplinkTemplate.name);
			expect(ziplink.sublinks).to.have.lengthOf(ziplinkTemplate.sublinks.length);

			done(err);
		});
	});

	it('can be retrieved by decoded ID', function(done){
		Ziplink.findByDecodedID(1, function(err, ziplink){
			expect(ziplink).to.exist;
			expect(ziplink.name).to.equal(ziplinkTemplate.name);
			expect(ziplink.sublinks).to.have.lengthOf(ziplinkTemplate.sublinks.length);
			done(err);
		});
	});

});