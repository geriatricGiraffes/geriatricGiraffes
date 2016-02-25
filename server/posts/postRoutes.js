var postController = require('./postController.js');
var Post       = require('./postModel.js');
var Comment    = require('../comments/commentModel.js')


module.exports = function ( app ) {
// Map logic to route parameter 'comment'
app.param('post', function(req, res, next, id) {
	var query = Post.findById(id);
	
	query.exec(function (err, post) {
		if (err) { return next(err); }
		if (!post) { return next(new Error("can't find post")); }
		
		req.post = post;
		return next();
	});
});

app.param('comment', function (req, res, next, id) {
	var query = Comment.findById(id);
	
	query.exec(function (err, comment) {
		if (err) { return next(err); }
		if (!comment) { return next(new Error("can't find comment")); }
		
		req.comment = comment;
		return next();
	});
});
  // app === postRouter injected from middleware.js
    app.get('/', postController.getPosts);
    app.post('/', postController.newPost);
    app.get('/:post', postController.getPost);
    //app.put('/:id', postController.editPost);
    app.delete('/:post', postController.deletePost);
};