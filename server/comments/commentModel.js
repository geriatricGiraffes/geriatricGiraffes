var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	},
	author: {
		type:mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	body: String,
	created: {
		type:Date,
		default: Date.now
	}
});


module.exports = mongoose.model('Comment', CommentSchema);
