var commentController = require('./commentController.js');

module.exports = function ( app ) {
    app.get('/', commentController.getComments);
    app.post('/', commentController.newComment);
    // app.put('/:id', commentController.editComment);
    // app.delete('/:id', commentController.deleteComment);
};