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
    Comments.getComments($scope.post._id).then(function(data) {
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

    // before sending newCommentBody off to the db, escape
    // any potentially malicious characters
    $scope.newCommentBody = LaundryService.cleanText($scope.newCommentBody);
    Comments.createComment($scope.post._id, $scope.newCommentBody, 'Anonymous', new Date());
    $scope.newCommentBody = '';
  };

  $scope.getComments();
});
