angular.module('hackoverflow.services', [])

// POSTS

.factory('Posts', function($http) {

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
      url: '/api/post/' + forum,
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
    console.log(postId + ' is for deleting');
    return $http({
      method: 'DELETE',
      url: '/api/post/' + postId
    });
  };

  return {
    getForums: getForums,
    getPosts: getPosts,
    createPost: createPost,
    editPost: editPost,
    deletePost: deletePost
  };
})

// COMMENTS

.factory('Comments', function ( $http ) {

  var getComments = function(postId) {
    console.log(postId + " is postId");
    return $http({
      method: 'GET',
      url: '/api/post/' + postId + '/comments'
    })
    .then(function(response) {
      return response;
      });
    };

  var getNumberOfComments = function(postId) {
    return $http({
      method: 'GET',
      url: '/api/post/' + postId + '/commentsNumber'
    })
    .then(function(response) {
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

  var deleteComment = function(postId, commentId) {
    return $http({
      method: 'DELETE',
      url: '/api/post/' + postId + '/comments/' + commentId
    });
  };

  var getNumberComments = function(postId) {
    // would be nice to get the # of comments for a given
    // post, otherwise i need to calculate that for each
    // post on the front end which would be unnecessarily
    // time complexive.
  };

  return {
    getComments: getComments,
    getNumberOfComments: getNumberOfComments,
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
