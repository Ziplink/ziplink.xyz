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
	ziplinkID: {
		type: String,
		default: shortid.generate,
		required: true,
		index: true,
		minlength: [1, 'Empty ziplinkID'],
		maxlength: [64, 'ziplinkID too long']
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
ziplinkSchema.plugin(autoIncrement.plugin, 'Ziplink');

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
 *	Creates a new Ziplink based on data passed in a ziplink template
 *	
 *	callback will be passed the arguments (err, ziplink)
 */
ziplinkSchema.statics.createZiplinkFromTemplate = function (ziplinkTemplate, callback){

	//If ziplinkTemplate has a blank ziplinkID, remove it to make way for a generated default
	if(ziplinkTemplate.ziplinkID == '')
		delete ziplinkTemplate.ziplinkID;

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

	this.findByZiplinkID(newZiplink.ziplinkID, function(err, matchingZiplink){
		if(err){ //check if there was an error
			callback(err);
		} else if(matchingZiplink != null){ //make sure we aren't doubling up on IDs
			callback('ziplink with this ID already exists');
		} else {
			newZiplink.save(function(err){
				console.log(err);
				callback(err, newZiplink);
			});
		}
	});
};

ziplinkSchema.methods.getEncodedID = function(){
	return base.decToGeneric(this._id, ID_ALPHABET);
};

var Ziplink = connection.model('Ziplink', ziplinkSchema);

//Export the Ziplink model
//Can then use this model with new Ziplink({});
module.exports = exports = Ziplink;