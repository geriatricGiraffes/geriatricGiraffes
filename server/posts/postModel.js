// app/models/post.js


var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	form:String,
	name: String,
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

	}]  // The ref option is what tells Mongoose which model to use during population
});
module.exports = mongoose.model('Post', PostSchema);


