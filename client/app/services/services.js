angular.module('hackoverflow.services', [])

// POSTS

.factory('Posts', function($http) {

  var getSamplePosts = function () {

    // db integration to replace sample data

    return $http({
      method: 'GET',
      url: "app/services/samplePostsData.json"
    })
    .then(function(response){
      return response;
    });
  };

  var getPosts = function () {
    return $http({
      method: 'GET',
      url: "database/url"
    })
    .then(function(response){
      return response;
      });
    };

  var createPost = function (post) {
    return $http({
      method: 'POST',
      url: "database/url",
      data: post
    });
    };

  var editPost = function ( postId ) {
    return $http({
      method: 'PUT',
      url: "database/url/postId",
      data: post
    });
  };

  var deletePost = function () {
    return $http({
      method: 'DELETE',
      url: "database/url/postId",
    });
  };

    // Original
    // return $http.get('app/services/samplePostsData.json').success(function(res) {
    //  });

  return {
    getSamplePosts: getSamplePosts,
    getPosts: getPosts,
    createPost: createPost,
    editPost: editPost,
    deletePost: deletePost
  };
})

// COMMENTS

.factory('Comments', function($http) {

  var getSampleComments = function (postId) {
    // db integration to replace sample data

    return $http({
      method: 'GET',
      url: "app/services/sampleCommentsData.json"
    })
    .then(function(response){
      return response;
    });
  };

  var getComments = function () {
    return $http({
      method: 'GET',
      url: "database/url"
    })
    .then(function(response){
      return response;
      });
    };

  var createComment = function ( comment ) {
    return $http({
      method: 'POST',
      url: "database/url",
      data: comment
    });
    };

  var editComment = function ( commentId ) {
    return $http({
      method: 'PUT',
      url: "database/url",
      data: comment
    });
  };

  var deleteComment = function () {
    return $http({
      method: 'DELETE',
      url: "database/url/commentId",
    });
  };

    // Original
    // return $http.get('app/services/sampleCommentsData.json').success(function(res) {
    // });

  return {
    getSampleComments: getSampleComments,
    getComments: getComments,
    createComment: createComment,
    editComment: editComment,
    deleteComment: deleteComment
  };

})

// AUTHENTICATION FACTORY ADDED

.factory('Auth', function ($http, $location, $window) {

  var signin = function ( user ) {
    return $http ({
      method: 'POST',
      url: 'someroute/signin',
      data: user
    })
    .then(function (response) {
      return response.data.token;
    });
  };

  var signup = function ( user ) {
    return $http({
      method: 'POST',
      url: 'someroute/signup',
      data: user
    })
    .then(function(response){
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