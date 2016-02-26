angular.module('hackoverflow.comments', [
  'hackoverflow.services',
  'ui.router'
])

.config(function($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('CommentsController',
  function($scope, $rootScope, $stateParams, $state, Comments,
    Posts, TimeService) {

  $scope.comments = [];
  $scope.post = $stateParams.post;
  $scope.comment = $stateParams.comment;
  $scope.newCommentBody = '';
  $scope.author = 'Anonymous';
  $scope.TimeService = TimeService;

  $scope.getComments = function getComments() {
    Comments.getComments($scope.post._id).then(function(data) {
      $scope.comments = data.data;
    });
  };

  $scope.deleteComment = function deleteComment(postId, commentId) {
    Comments.deleteComment(postId, commentId);
    $scope.getComments();
  };

  $scope.deletePost = function deletePost(postId) {
    Posts.deletePost(postId);
    $state.go('posts');
  };

  $scope.submit = function() {

    Comments.createComment($scope.post._id, $scope.newCommentBody, $rootScope.user, new Date());
    $scope.newCommentBody = '';
    $scope.getComments();
  };

  $scope.getComments();
});
