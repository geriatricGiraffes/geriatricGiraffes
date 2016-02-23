var mongoose = require('mongoose');

var PostSchema = new mongoose.PostSchema({
 _id: Number,
 author:{
 	type: mongoose.Schema.Types.ObjectId,
 	ref : 'User',
 }, 
 title: String,
 created: {
 	type: Date,
 	Default: Date.now
 }
});


module.exports = mongoose.model('posts', PostSchema);
// {
//     "id": 0,
//     "author": "Spiney Norman",
//     "title": "What is up with Angular and injection?",
//     "created": "5/2/15"
//   },