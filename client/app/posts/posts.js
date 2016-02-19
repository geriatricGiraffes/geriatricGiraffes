angular.module('hackoverflow.posts', [
  'hackoverflow.services'
])

.controller('PostsController', function ($scope, Posts) {

  $scope.posts = [];

  $scope.sort = function(arg) {
  }

  $scope.getPosts = function getPosts() {
    $scope.posts = Posts.getPosts();
    // use below version with .then when db is online
    // Posts.getPosts().then(function(data) {
    //   $scope.posts = data;
    // })
  }

  $scope.getPosts();
});
