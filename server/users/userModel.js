var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  oauthID: Number,
  name: String,
  photoUrl: String,
  created: Date,
  posts : [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }]
});

module.exports = mongoose.model('User', UserSchema);