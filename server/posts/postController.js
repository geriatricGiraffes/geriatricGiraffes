module.exports = {

  getPosts : function ( request, response ) {
    Post.find(function(err, posts){
      if (err) {
        return response.send(err);
      }

      response.json(posts);
    });

  },
  newPost : function ( request, response ) {
    var post = new Post(request.body);

    post.save(function(err) {
      if (err) {
        return response.send(err);
      }

      response.send({ message: 'Post added!'});
    });
  },

  editPost : function ( request, response ) {
    Post.findOne({ _id: request.params.id }, function(err, post){
      if (err){
        return response.send(err);
      }

      for (var prop in request.body) {
        post[prop] = request.body[prop];
      }

      post.save(function(err) {
        if (err) {
          return response.send(err);
        }

        response.json({ message: 'Post updated!'});
      });
    });

  },

  deletePost : function ( request, response ) {
    Post.remove({
      _id: request.params.id
    }, function(err, post) {
      if (err) {
        return response.send(err);
      }
      response.json({ message: 'Successfully deleted' });
    });
    }

};