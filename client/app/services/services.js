angular.module('hackoverflow.services', [])

.factory('Posts', function($http) {

  function getPosts() {

    // db integration to replace sample data
    return $http.get('app/services/samplePostsData.json').success(function(res) {
     });
  }

  return {
    getPosts: getPosts
  };
})

.factory('Comments', function($http) {

  function getComments(postId) {

    // db integration to replace sample data
    return $http.get('app/services/sampleCommentsData.json').success(function(res) {
    });
  }

  return {
    getComments: getComments
  };
});
