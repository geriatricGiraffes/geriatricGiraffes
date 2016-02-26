angular.module('hackoverflow.services', [])

// POSTS

.factory('Posts', function($http) {

  // db integration to replace sample data
  // this method will become obsolete when
  // db is online
  // TODO: remove getSamplePosts when db online
  var getSamplePosts = function() {
    return $http({
      method: 'GET',
      url: 'app/services/samplePostsData.json'
    })
    .then(function(response){
      return response;
    });
  };

  var getForums = function() {
    return $http({
      method: 'GET',
      url: 'app/config/forums.json'
    })
    .then(function ( response ){
      return response;
    });
  };

  var getPosts = function(forum) {
    return $http({
      method: 'GET',
      url: '/api/post'
    })
    .then(function ( response ){
      return response;
      });
    };

  var createPost = function(title, body, forum, author, created) {
    var newPost = {
      title: title,
      body: body,
      forum: forum,
      author: author,
      created: created
    };
    console.log('create post: ', newPost);
    return $http({
      method: 'POST',
      url: '/api/post',
      data: newPost
    });
  };

  var editPost = function(postId, title, body,
    forum, author, created) {
    var editedPost = {
      postId: postId,
      title: title,
      body: body,
      forum: forum,
      author: author,
      created: created
    };
    console.log('edited post: ', editedPost);
    return $http({
      method: 'PUT',
      url: '/api/post/' + postId,
      data: editedPost
    });
  };

  var deletePost = function(postId) {
    return $http({
      method: 'DELETE',
      url: '/api/post/postId'
    });
  };

  return {
    getSamplePosts: getSamplePosts,
    getForums: getForums,
    getPosts: getPosts,
    createPost: createPost,
    editPost: editPost,
    deletePost: deletePost
  };
})

// COMMENTS

.factory('Comments', function ( $http ) {

  // db integration to replace sample data
  // this method will become obsolete when
  // db is online
  // TODO: remove getSampleComments when db online
  var getSampleComments = function(postId) {
    // db integration to replace sample data
    return $http({
      method: 'GET',
      url: 'app/services/sampleCommentsData.json'
    })
    .then(function(response) {
      return response;
    });
  };

  var getComments = function(postId) {
    console.log(postId + " is postId");
    return $http({
      method: 'GET',
      url: '/api/post/' + postId + '/comments'
    })
    .then(function(response) {
      console.log(response);
      return response;
      });
    };

  var createComment = function(postId, body, author, created) {
    var newComment = {
      postId: postId,
      body: body,
      author: author,
      created: created
    };
    console.log('new comment: ', newComment);
    return $http({
      method: 'POST',
      url: '/api/post/' + postId + '/comments',
      data: newComment
    });
  };

  // no edit comments for now. v2.
  // var editComment = function(commentId) {
  //   return $http({
  //     method: 'PUT',
  //     url: '/api/comments/' + commentId,
  //     data: comment
  //   });
  // };

  var deleteComment = function(commentId) {
    return $http({
      method: 'DELETE',
      url: '/api/post/commentId'
    });
  };

  var getNumberComments = function(postId) {
    // would be nice to get the # of comments for a given
    // post, otherwise i need to calculate that for each
    // post on the front end which would be unnecessarily
    // time complexive.
  };

  return {
    getSampleComments: getSampleComments,
    getComments: getComments,
    createComment: createComment,
    // editComment: editComment,
    deleteComment: deleteComment,
    getNumberComments: getNumberComments
  };

})

// AUTHENTICATION FACTORY ADDED

.factory('Auth', function($http, $location, $window) {

  var signin = function(user) {
    return $http ({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function(response) {
      return response.data.token;
    });
  };

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function ( response ) {
      return response.data.token;
    });
  };

  var isAuth = function() {
    return !!$window.localStorage.getItem('someToken');
  };

  var signout = function() {
    $window.localStorage.removeItem('someToken');
    $location.path('/signin');
  };

  return {
    singin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };

})

.factory('TimeService', function() {

  var relativeDate = function(date) {
    return moment(date).fromNow();
  };

  return {
    relativeDate: relativeDate
  };

});
