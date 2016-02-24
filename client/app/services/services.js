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

  // db integration to replace sample data
  // this method will become obsolete when
  // db is online
  // TODO: remove getSampleForums when db online
  var getSampleForums = function() {
    return $http({
      method: 'GET',
      url: 'app/services/sampleForumData.json'
    })
    .then(function(response){
      return response;
    });
  };

  var getPosts = function(forum) {
    return $http({
      method: 'GET',
      url: 'database/url'
    })
    .then(function(response){
      return response;
      });
    };

  var createPost = function(title, body, forum) {
    return $http({
      method: 'POST',
      url: 'database/url',
      data: {
        title: title,
        body: body,
        forum: forum
      }
    });
  };

  var editPost = function(postId) {
    return $http({
      method: 'PUT',
      url: 'database/url/postId',
      data: post
    });
  };

  var deletePost = function(postId) {
    return $http({
      method: 'DELETE',
      url: 'database/url/postId'
    });
  };

  return {
    getSamplePosts: getSamplePosts,
    getSampleForums: getSampleForums,
    getPosts: getPosts,
    createPost: createPost,
    editPost: editPost,
    deletePost: deletePost
  };
})

// COMMENTS

.factory('Comments', function($http) {

  // db integration to replace sample data
  // this method will become obsolete when
  // db is online
  // TODO: remove getSampleComments when db online
  var getSampleComments = function(postId) {
    return $http({
      method: 'GET',
      url: 'app/services/sampleCommentsData.json'
    })
    .then(function(response) {
      return response;
    });
  };

  var getComments = function() {
    return $http({
      method: 'GET',
      url: 'database/url'
    })
    .then(function(response) {
      return response;
      });
    };

  var createComment = function(comment) {
    return $http({
      method: 'POST',
      url: 'database/url',
      data: comment
    });
    };

  var editComment = function(commentId) {
    return $http({
      method: 'PUT',
      url: 'database/url',
      data: comment
    });
  };

  var deleteComment = function(commentId) {
    return $http({
      method: 'DELETE',
      url: 'database/url/commentId'
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

.factory('Auth', function($http, $location, $window) {

  var signin = function(user) {
    return $http ({
      method: 'POST',
      url: 'someroute/signin',
      data: user
    })
    .then(function(response) {
      return response.data.token;
    });
  };

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: 'someroute/signup',
      data: user
    })
    .then(function(response){
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

.factory('LaundryService', function() {

  // used by post and comment forms to escape any
  // malicious-looking characters
  var cleanText = function(text) {
    text = text || '';
    var textArray = text.split('');
    var badChars = ['<', '>', '&', '"', "'", '!', '@',
                    '$', '%', '(', ')', '=', '+', '{', '}',
                    '[', ']', '-'];

    for (var i = 0; i < badChars.length; i++) {
      for (var j = 0; j < textArray.length; j++) {
        if (textArray[j] === badChars[i]) {
          textArray[j] = '&#' + textArray[j].charCodeAt(0) + ';';
        }
      }
    }
    return textArray.join('');
  };

  return {
    cleanText: cleanText
  };
});
