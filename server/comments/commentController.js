
var Post       = require('../posts/postModel.js');
var Comment    = require('./commentModel.js')

module.exports = {

  // getComments : function ( request, response, next ) {
  //   Post.comments.find(function(err, lesComments){
  //     if (err) {
  //       return response.send(err);
  //     }

  //     response.json(lesComments);
  //   });

  // },
  
  newComment : function(req, res, next) {
   var comment = new Comment(req.body);
   comment.post = req.post;
   comment.author = 'anonymous';
   comment.body = req.body.body;
   comment.save(function(err, comment) {
     if (err) { return next(err); }
    
     req.post.comments.push(comment);
     req.post.save(function(err, post) {
       if (err) { return next(err); }
      
       res.json(comment);
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

