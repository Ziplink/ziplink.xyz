var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ziplink');
var Schema = mongoose.Schema;

var shortid = require('shortid');
const url = require('url');

//setup Ziplink schema
var ziplinkSchema = new Schema({
	ziplinkID: {
		type: String,
		default: shortid.generate,
		required: true,
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
				enum: [ 'http:', 'https:' ]
			}
		}]
});

ziplinkSchema.statics.findByID = function (linkID, callback){
	this.findOne({'ziplinkID': linkID}, callback);
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
		var protocol = urlObject.protocol;
		
		sublink.protocol = protocol;
	});

	var newZiplink = new this(ziplinkTemplate);

	this.findByID(newZiplink.ziplinkID, function(err, matchingZiplink){
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

var Ziplink = mongoose.model('Ziplink', ziplinkSchema);

//Export the Ziplink model
//Can then use this model with new Ziplink({});
module.exports = exports = Ziplink;