var commentController = require('./commentController.js');

module.exports = function ( app ) {
  app.route('/comments')
    .get(commentController.allComments)
    .post(commentController.newComment);
};