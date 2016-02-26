angular.module('hackoverflow.edit-post', [
  'hackoverflow.services',
  'ui.router'
])

.config(function($stateProvider) {
})

.controller('EditPostController', function($scope, $state,
  $stateParams, Posts) {

  $scope.forums = [];
  $scope.forum = 'Please choose a forum';
  $scope.post = $stateParams.post;
  $scope.author = $stateParams.author;
  $scope.postId = $scope.post._id;
  $scope.title = $scope.post.title;
  $scope.body = $scope.post.body;
  $scope.forum = $scope.post.forum;

  $scope.getForums = function getForums() {
    Posts.getForums().then(function(data) {
      $scope.forums = data.data.sort();
      $scope.forums.unshift('Please choose a forum');
    });
  };

  $scope.submit = function() {

    Posts.editPost($scope.postId, $scope.title,
      $scope.body, $scope.forum, $scope.author, new Date());
    $state.go('posts');
  };

  $scope.getForums();
});
