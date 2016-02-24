module.exports = {

  getComments : function ( request, response ) {
    Post.comments.find(function(err, lesComments){
      if (err) {
        return response.send(err);
      }

      response.json(lesComments);
    });

  },
  newComment : function ( request, response ) {
    var comment = new Post.comments.push(request.body);

    comment.save(function(err) {
      if (err) {
        return response.send(err);
      }

      response.send({ message: 'Post added!'});
    });
  },

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