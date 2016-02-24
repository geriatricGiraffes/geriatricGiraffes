angular.module('hackoverflow.posts', [
  'hackoverflow.services',
  'ui.router'
])

.config(function($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('PostsController', function($scope, $stateParams, $state, Posts) {

  $scope.posts = [];

  $scope.getPosts = function getPosts() {
    Posts.getSamplePosts().then(function(data) {
      console.log(data.data);
      $scope.posts = data.data;
    });
  };

  $scope.getPosts();
});
