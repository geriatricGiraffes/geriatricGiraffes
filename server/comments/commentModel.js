
var mongoose = require('mongoose');

var CommentSchema = new mongoose.CommentSchema({ 
	_id : Number,
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	},
	author: {
		type:mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	body: String,
	timeStamp: {
		type:Date,
		default: Date.now
	}
});


module.exports = mongoose.model('comments', CommentSchema);



// {
//     "commentId": 0,
//     "postId": 0,
//     "userId": "Spiney Norman",
//     "body": "Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.",
//     "timeStamp": "5/2/15"
//   },