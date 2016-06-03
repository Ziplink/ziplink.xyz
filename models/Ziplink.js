var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//setup Ziplink schema
var ziplinkSchema = new Schema({
	linkID: String,
	sublinks: [{
			url: String
		}]
});

var Ziplink = mongoose.model('Ziplink', ziplinkSchema);

//Export the Ziplink model
//Can then use this model with new Ziplink({});
module.exports = exports = Ziplink;