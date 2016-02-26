angular.module('hackoverflow.posts', [
  'hackoverflow.services',
  'ui.router'
])

.config(function($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('PostsController', function($scope, $stateParams, $state, Posts, TimeService) {

  $scope.posts = [];
  $scope.forums = [];
  $scope.forum = 'Angular';
  $scope.TimeService = TimeService;

  $scope.getPosts = function getPosts(forum) {

    // TODO: need to pass in forum to Posts.getPosts()
    Posts.getPosts('').then(function(data) {
      console.log(data);
      $scope.posts = data.data;
    });
  };

  $scope.getForums = function getForums(forum) {
    Posts.getForums().then(function(data) {
      $scope.forums = data.data.sort();
    });
  };

  $scope.switchForum = function switchForum(forum) {
    $scope.forum = forum;
    $scope.getForums();
  };

  $scope.getPosts($scope.forum);
  $scope.getForums();
});
