angular.module('hackoverflow.services', [])

// POSTS

.factory('Posts', function ( $http ) {

  // db integration to replace sample data
  // this method will become obsolete when
  // db is online
  var getSamplePosts = function () {
    return $http({
      method: 'GET',
      url: "app/services/samplePostsData.json"
    })
    .then(function ( response ){
      return response;
    });
  };

  var getPosts = function (forum) {
    return $http({
      method: 'GET',
      url: "/api/posts"
    })
    .then(function ( response ){
      return response;
      });
    };

  var createPost = function ( post ) {
    return $http({
      method: 'POST',
      url: "/api/posts",
      data: post
    });
    };

  var editPost = function ( postId ) {
    return $http({
      method: 'PUT',
      url: "/api/posts/" + postId,
      data: post
    });
  };

  var deletePost = function (postId) {
    return $http({
      method: 'DELETE',
      url: "/api/posts/postId",
    });
  };

  return {
    getSamplePosts: getSamplePosts,
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

  var getSampleComments = function ( postId ) {
    // db integration to replace sample data
    return $http({
      method: 'GET',
      url: "app/services/sampleCommentsData.json"
    })
    .then(function ( response ) {
      return response;
    });
  };

  var getComments = function () {
    return $http({
      method: 'GET',
      url: "/api/comments"
    })
    .then(function ( response ) {
      return response;
      });
    };

  var createComment = function ( comment ) {
    return $http({
      method: 'POST',
      url: "/api/comments",
      data: comment
    });
    };

  var editComment = function ( commentId ) {
    return $http({
      method: 'PUT',
      url: "/api/comments/" + commentId,
      data: comment
    });
  };

  var deleteComment = function (commentId) {
    return $http({
      method: 'DELETE',
      url: "/api/comments/commentId",
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
    editComment: editComment,
    deleteComment: deleteComment,
    getNumberComments: getNumberComments
  };

})

// AUTHENTICATION FACTORY ADDED

.factory('Auth', function ( $http, $location, $window ) {

  var signin = function ( user ) {
    return $http ({
      method: 'POST',
      url: "/api/users/signin",
      data: user
    })
    .then(function ( response ) {
      return response.data.token;
    });
  };

  var signup = function ( user ) {
    return $http({
      method: 'POST',
      url: "/api/users/signup",
      data: user
    })
    .then(function ( response ) {
      return response.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('someToken');
  };

  var signout = function () {
    $window.localStorage.removeItem('someToken');
    $location.path('/signin');
  };

  return {
    singin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };

});
