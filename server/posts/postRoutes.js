var postController = require('./postController.js');

module.exports = function ( app ) {
  // app === postRouter injected from middleware.js

  app.route('/')
    .get(postController.allPosts)
    .post(postController.newPost);
};