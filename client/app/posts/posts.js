angular.module('hackoverflow.posts', [
  'hackoverflow.services'
])
.controller('PostsController', function ($scope, Posts) {
  $scope.data= [];

  $scope.sort = function(arg) {
  }

  $scope.logout = function logout() {
    Auth.signout();
  }

  $scope.getPosts = function getPosts() {
    Posts.getPosts().then(function(data) {
      $scope.data = data;
    })
  }
  $scope.getPosts();
});
