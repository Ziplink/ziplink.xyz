var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ziplink');
var Schema = mongoose.Schema;

var shortid = require('shortid');

//setup Ziplink schema
var ziplinkSchema = new Schema({
	ziplinkID: {
		type: String,
		'default': shortid.generate,
		required: true,
		minlength: [1, 'Empty ziplinkID'],
		maxlength: [64, 'ziplinkID too long']
	},
	sublinks: [{
			url: {
				type: String,
				minlength: [4, 'URL too short'],
				maxlength: [2083, 'URL too long']
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

	var newZiplink = new this(ziplinkTemplate);

	this.findByID(newZiplink.ziplinkID, function(err, matchingZiplink){
		if(err){ //check if there was an error
			callback(err);
		} else if(matchingZiplink != null){ //make sure we aren't doubling up on IDs
			callback('ziplink with this ID already exists');
		} else {
			newZiplink.save(function(err){
				callback(err, newZiplink);
			});
		}
	});
};

var Ziplink = mongoose.model('Ziplink', ziplinkSchema);

//Export the Ziplink model
//Can then use this model with new Ziplink({});
module.exports = exports = Ziplink;