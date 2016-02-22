angular.module('hackoverflow.posts', [
  'hackoverflow.services'
])

.controller('PostsController', function($scope, Posts) {

  $scope.posts = [];

  $scope.getPosts = function getPosts() {
    Posts.getSamplePosts().then(function(data) {
      console.log(data.data);
      $scope.posts = data.data;
    });
  };

  $scope.getPosts();
});
