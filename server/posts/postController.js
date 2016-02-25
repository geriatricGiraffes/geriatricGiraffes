var Post       = require('./postModel.js');
var Comment    = require('../comments/commentModel.js');
module.exports = {


  // gets all posts
  getPosts : function(req, res, next) {
    Post.find(function(err, posts) {
    if (err) { return next(err); }

     res.json(posts);
   });
 },
  // gets a single post
  getPost : function(req, res) {
    req.post.populate('comment', function (err, post) {
      res.json(post);
   });
 },
    // creates a new post
  newPost : function(req, res, next) {
    var post = new Post(req.body);
    post.title = req.body.title;
    post.author = 'anonymous';
    post.body = req.body.body;
    post.save(function(err, post) {
     if(err) { return next(err); }

     res.json(post);
   });
 },

  // editPost : function ( request, response ) {
  //   Post.findOne({ _id: request.params.id }, function(err, post){
  //     if (err){
  //       return response.send(err);
  //     }

  //     for (var prop in request.body) {
  //       post[prop] = request.body[prop];
  //     }

  //     post.save(function(err) {
  //       if (err) {
  //         return response.send(err);
  //       }

  //       response.json({ message: 'Post updated!'});
  //     });
  //   });

  // },
  // deletes post and it comment children
  deletePost : function(req, res) {
   req.post.comments.forEach(function(id) {
    Comment.remove({
      _id: id
     }, function(err) {
      if (err) { return next(err)}
     });
   });
   Post.remove({
    _id: req.params.post
   }, function(err, post) {
     if (err) { return next(err); }

    // get and return all the posts after you delete one
    Post.find(function(err, posts) {
      if (err) { return next(err); }

       res.json(posts);
    });
   });
 }
};
