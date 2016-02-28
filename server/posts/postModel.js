var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	forum:String,
	author: String,
	title: String,
	body: String,
	created: {
		type: Date,
		default: Date.now
	},
	comments: [{
		author: String,
		body:String,
		created: {
			type: Date,
			default: Date.now
		}
	}]  
});

module.exports = mongoose.model('Post', PostSchema);


