var mongoose = require('mongoose');

var UserSchema = new mongoose.UserSchema({
  oauthID: Number,
  _id : Number,
  name: String,
  photoUrl: String,
  created: Date
});

module.exports = mongoose.model('users', UserSchema);