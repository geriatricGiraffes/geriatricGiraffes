angular.module('hackoverflow.comments', [
  'hackoverflow.services',
  'ui.router'
])

.config(function($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('CommentsController',
  function($scope, $stateParams, $state, Comments, Posts) {

  $scope.comments = [];
  $scope.postId = $stateParams.id;

  $scope.getComments = function getComments() {
    Comments.getSampleComments($scope.postId).then(function(data) {
      $scope.comments = data.data;
    });
  };

  $scope.deleteComment = function deleteComment(commentId) {
    Comments.deleteComment(commentId);
    $scope.getComments();
  };

  $scope.editPost = function editPost(postId) {
    console.log('edit post', postId);
  };

  $scope.deletePost = function deletePost(postId) {
    Posts.deletePost(postId);
    $state.go('posts');
  };

  $scope.getComments();
});
