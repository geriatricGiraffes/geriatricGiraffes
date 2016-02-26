angular.module('hackoverflow.comments', [
  'hackoverflow.services',
  'ui.router'
])

.config(function($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('CommentsController',
  function($scope, $rootScope, $stateParams, $state, Comments,
    Posts, LaundryService, TimeService) {

  $scope.comments = [];
  $scope.post = $stateParams.post;
  $scope.newCommentBody = '';
  $scope.TimeService = TimeService;

  $scope.getComments = function getComments() {
    Comments.getSampleComments($scope.postId).then(function(data) {
      $scope.comments = data.data;
    });
  };

  $scope.deleteComment = function deleteComment(commentId) {
    Comments.deleteComment(commentId);
    $scope.getComments();
  };

  $scope.deletePost = function deletePost(postId) {
    Posts.deletePost(postId);
    $state.go('posts');
  };

  $scope.submit = function() {

    Comments.createComment($scope.post.postId, $scope.newCommentBody, 'Anonymous', new Date());
    $scope.newCommentBody = '';
  };

  $scope.getComments();
});
