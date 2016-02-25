angular.module('hackoverflow.posts', [
  'hackoverflow.services',
  'ui.router'
])

.config(function($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('PostsController', function($scope, $stateParams, $state, Posts) {

  $scope.posts = [];
  $scope.forums = [];
  $scope.forum = 'Angular';

  $scope.getPosts = function getPosts() {
    Posts.getSamplePosts().then(function(data) {
      $scope.posts = data.data;
    });
  };

  $scope.getForums = function getForums(forum) {
    Posts.getSampleForums(forum).then(function(data) {
      $scope.forums = data.data.sort();
    });
  };

  $scope.switchForum = function switchForum(forum) {
    $scope.forum = forum;
    $scope.getForums(forum);
  };

  $scope.getPosts();
  $scope.getForums();
});
