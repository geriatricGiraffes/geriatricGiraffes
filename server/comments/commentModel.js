var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	body: String,
	author: String,
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},  // The ref option is what tells Mongoose which model to use during population.
      created: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Comment', CommentSchema);