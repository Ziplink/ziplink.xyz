var dbURI		= 'mongodb://localhost/ziplink',
	expect		= require('chai').expect,
	mongoose	= require('mongoose'),
	Ziplink		= require('../../models/Ziplink.js')
	;

describe('Ziplink DB Model', function(){

	describe('Emptying Database', function(){
		before(function(done){
			if(mongoose.connection.db) return done();
			mongoose.connect(dbURI, done);
		});

		it('can be emptied', function(done){
			Ziplink.emptyDB(done);
		});

		it('has no entries after being emptied', function(done){
			Ziplink.count({}, function(err, count){
				expect(count).to.equal(0);
				done(err);
			});
		});

		it('has a next index of 1 after being emptied', function(done){
			Ziplink.nextCount(function(err, count){
				expect(count).to.equal(1);
				done(err);
			});
		});


	});


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
	
});