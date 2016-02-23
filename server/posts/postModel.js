var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
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


module.exports = mongoose.model('Post', PostSchema);
