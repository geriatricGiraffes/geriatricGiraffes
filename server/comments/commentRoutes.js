var commentController = require('./commentController.js');
var Post       = require('../posts/postModel.js');
var Comment    = require('./commentModel.js');


module.exports = function ( app ) {

// app.param('comments', function (req, res, next, id) {
// 	var query = Comment.findById(id);

// 	query.exec(function (err, comment) {
// 		if (err) { return next(err); }
// 		if (!comment) { return next(new Error("can't find comment")); }

// 		req.comment = comment;
// 		return next();
// 	});
// });
	// Map logic to route parameter 'post'
app.param('post', function(req, res, next, id) {
	var query = Post.findById(id);

	query.exec(function (err, post) {
		if (err) { return next(err); }
		if (!post) { return next(new Error("can't find post")); }

		req.post = post;
		return next();
	});
});

    app.get('/:post/comments', commentController.getComments);
    app.post('/:post/comments', commentController.newComment);
    // app.put('/:id', commentController.editComment);
    // app.delete('/:id', commentController.deleteComment);
};