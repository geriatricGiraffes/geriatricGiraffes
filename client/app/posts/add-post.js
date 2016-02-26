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
  $scope.forums = [];
  $scope.forum = 'Please choose a forum';

  $scope.getForums = function getForums() {
    Posts.getSampleForums().then(function(data) {
      $scope.forums = data.data.sort();
      $scope.forums.unshift('Please choose a forum');
    });
  };

  $scope.submit = function() {

    Posts.createPost($scope.title, $scope.body, $scope.forum, 'Anonymous', new Date());
    $state.go('posts');
  };

  $scope.getForums();
});
