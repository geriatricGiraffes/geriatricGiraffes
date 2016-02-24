var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
 author:{
 	type: mongoose.Schema.Types.ObjectId,
 	ref : 'User',
 },
 title: String,
 body: String,
 forum: String,
 created: {
 	type: Date,
 	Default: Date.now
 },
 comments: [
    {
      author:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
      },
      body: String,
      created: {
        type: Date,
        Default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('Post', PostSchema);
