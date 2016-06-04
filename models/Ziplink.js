var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ziplink');
var Schema = mongoose.Schema;

//setup Ziplink schema
var ziplinkSchema = new Schema({
	ziplinkID: {
		type: String,
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
	return this.findOne({'ziplinkID': linkID}, callback);
};

var Ziplink = mongoose.model('Ziplink', ziplinkSchema);

//Export the Ziplink model
//Can then use this model with new Ziplink({});
module.exports = exports = Ziplink;