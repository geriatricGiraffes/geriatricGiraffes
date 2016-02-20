angular.module('hackoverflow.posts', [
  'hackoverflow.services'
])

.controller('PostsController', function ($scope, Posts) {

  $scope.posts = [];

  $scope.sort = function(arg) {
  }

  $scope.getPosts = function getPosts() {
    Posts.getPosts().then(function(data) {
      $scope.posts = data.data;
    })
  }

  $scope.getPosts();
});
