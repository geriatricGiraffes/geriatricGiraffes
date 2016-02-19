angular.module('hackoverflow.services', [])

.factory('Posts', function ($http) {

  function getPosts() {

    // db integration to replace sample data
    return $http.get('app/services/samplePostsData.json').success(function(res) {
       return res.data;
     });
  }

  return {
    getPosts: getPosts
  };
});
