angular.module('hackoverflow.add-post', [
  'hackoverflow.services',
  'ui.router'
])

.config(function($stateProvider) {
})

.controller('AddPostController', function($scope, $state,
  $stateParams, Posts) {

  $scope.title = '';
  $scope.body = '';
  $scope.author = 'Anonymous'
  $scope.forums = [];
  $scope.forum = 'Please choose a forum';

  $scope.getForums = function getForums() {
    Posts.getForums().then(function(data) {
      $scope.forums = data.data.sort();
      $scope.forums.unshift('Please choose a forum');
    });
  };

  $scope.submit = function() {

    if ($scope.author === 'Anonymous') {
      $scope.author = prompt('Please enter your name');
    }

    Posts.createPost($scope.title, $scope.body, $scope.forum,
      $scope.author, new Date());
    $state.go('posts');
  };

  $scope.getForums();
});
