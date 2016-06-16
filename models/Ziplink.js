var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost/ziplink');

autoIncrement.initialize(connection);

var shortid = require('shortid');
var url = require('url');
var base = require('base-converter');

var ID_ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

//setup Ziplink schema
var ziplinkSchema = new Schema({
	name: {
		type: String,
		default: "Ziplink",
		maxlength: [64, 'Name too long']
	},
	sublinks: [{
			url: {
				type: String,
				required: true,
				minlength: [4, 'URL too short'],
				maxlength: [2083, 'URL too long']
			},
			protocol: {
				type: String,
				default: 'http:',
				required: true,
				enum: [ 'http:', 'https:', 'ftp:' ]
			}
		}]
});

/**
 *	Add the autoIncrement plugin to the schema
 *	Sets the _id of each Ziplink to the previous _id+1
 */
ziplinkSchema.plugin(autoIncrement.plugin, {
	model: 'Ziplink',
	field: '_id',
	startAt: 1
});

ziplinkSchema.statics.findByZiplinkID = function (linkID, callback){
	this.findOne({'ziplinkID': linkID}, callback);
};

ziplinkSchema.statics.findByEncodedID = function(encodedID, callback){
	this.findByDecodedID(base.genericToDec(encodedID, ID_ALPHABET), callback);
};

ziplinkSchema.statics.findByDecodedID = function(decodedID, callback){
	this.findById(decodedID, callback);
};

/**
 * Empties the database and resets the counter, mainly for testing
 */
ziplinkSchema.statics.emptyDB = function(callback){
	//Keep a reference so we can call resetCount after we lose the 'this' reference
	var resetCount = this.resetCount;
	this.remove({}, function(err){
		if(err)
			callback(err);
		resetCount(function(err, nextCount){
			callback(err, nextCount);
		});
	});
};

/**
 *	Creates a new Ziplink based on data passed in a ziplink template
 *	
 *	callback will be passed the arguments (err, ziplink)
 */
ziplinkSchema.statics.createZiplinkFromTemplate = function (ziplinkTemplate, callback){

	// Pull the protocol off the URL
	// This doesn't do any protocol checking, that is done by the supplied enum.
	ziplinkTemplate.sublinks.forEach(function(sublink) {
		var urlObject = url.parse(sublink.url);

		// If `url` fails to parse the given URL we assume it's malformed in a way
		// and discard it
		if(urlObject === null)
				callback('The URL: ' + sublink.url + ' isn\'t a valid URL');

		// If we don't get a protocol, remove reference so mongoose uses default
		if(urlObject.protocol === null)
			delete urlObject.protocol;

		sublink.protocol = urlObject.protocol;
		
		//TODO: possibly store this information in component parts in DB
		sublink.url = urlObject.host || '' + urlObject.path || '' + urlObject.hash || '';
	});

	var newZiplink = new this(ziplinkTemplate);

	newZiplink.save(function(err){
		console.log(err);
		callback(err, newZiplink);
	});
};

ziplinkSchema.methods.getEncodedID = function(){
	return base.decToGeneric(this._id, ID_ALPHABET);
};

var Ziplink = connection.model('Ziplink', ziplinkSchema);

//Export the Ziplink model
//Can then use this model with new Ziplink({});
module.exports = exports = Ziplink;