var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  displayName: String,
  picture: String,
  github: String
  // photoUrl: String,
  // created: Date,
  // posts : [{ type: Schema.Types.ObjectId, ref: 'Posts'}],
  // comments: [{ type: Schema.Types.ObjectId, ref: 'Comments'}]
});

module.exports = mongoose.model('User', UserSchema);
