var mongoose = require('mongoose');

var UserSchema = new mongoose.UserSchema({
  oauthID: Number,
  name: String,
  photoUrl: String,
  created: Date
});