var postController = require('./postController.js');

module.exports = function ( app ) {
  // app === postRouter injected from middleware.js
    app.get('/', postController.allPosts);
    app.post('/', postController.newPost);
    app.put('/:id', postController.editPost);
    app.delete('/:id', postController.deletePost);
};