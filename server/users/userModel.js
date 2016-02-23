var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  oauthID: Number,
  name: String,
  photoUrl: String,
  created: Date
});

module.exports = mongoose.model('User', UserSchema);