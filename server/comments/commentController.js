
var Post       = require('../posts/postModel.js');
var Comment    = require('./commentModel.js');

module.exports = {

  getComments : function ( request, response, next ) {
    Comment.find({ 'post' : request.post._id }, function(err, lesComments){
      if (err) {
        return response.send(err);
      }
      response.json(lesComments);
    });
  },

  newComment : function(request, response, next) {
   var comment = new Comment(request.body);
   comment.post = request.post;
   comment.author = request.body.author;
   comment.body = request.body.body;
   comment.save(function(err, comment) {
     if (err) { return next(err); }

     request.post.comments.push(comment);
     request.post.save(function(err, post) {
       if (err) { return next(err); }

       response.json(comment);
     });
   });
 }







  //function ( request, response, next ) {
  //   var comment = new Post.comments.push(request.body);

  //   comment.save(function(err) {
  //     if (err) {
  //       return response.send(err);
  //     }

  //     response.send({ message: 'Post added!'});
  //   });
  // }

  // deleteComment : function ( request, response ) {
  //   Post.comments.comment.remove({
  //     _id: request.params.id
  //   }, function(err, post) {
  //     if (err) {
  //       return response.send(err);
  //     }
  //     response.json({ message: 'Successfully deleted' });
  //   });
  //   }

};

