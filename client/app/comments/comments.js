angular.module('hackoverflow.comments', [
  'hackoverflow.services',
  'ui.router'
])

.config(function($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('CommentsController',
  function($scope, $rootScope, $stateParams, $state, Comments,
    Posts, LaundryService) {

  $scope.comments = [];
  $scope.post = $stateParams.post;
  $scope.newCommentBody = '';

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

  $scope.submit = function() {

    // before sending newCommentBody off to the db, escape
    // any potentially malicious characters
    $scope.newCommentBody = LaundryService.cleanText($scope.newCommentBody);
    Comments.createComment($scope.newCommentBody);
    $scope.newCommentBody = '';
  };

  $scope.getComments();
});
