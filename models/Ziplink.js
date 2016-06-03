var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ziplink');
var Schema = mongoose.Schema;

//setup Ziplink schema
var ziplinkSchema = new Schema({
	ziplinkID: String,
	sublinks: [{
			url: String
		}]
});

ziplinkSchema.statics.findByID = function (linkID, callback){
	return this.findOne({'ziplinkID': linkID}, callback);
};

var Ziplink = mongoose.model('Ziplink', ziplinkSchema);

//Export the Ziplink model
//Can then use this model with new Ziplink({});
module.exports = exports = Ziplink;