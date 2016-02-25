angular.module('hackoverflow.edit-post', [
  'hackoverflow.services',
  'ui.router'
])

.config(function($stateProvider) {
})

.controller('EditPostController', function($scope, $state,
  $stateParams, Posts, LaundryService) {

  $scope.forums = [];
  $scope.forum = 'Please choose a forum';
  $scope.post = $stateParams.post;
  $scope.postId = $scope.post.postId;
  $scope.title = $scope.post.postTitle;
  $scope.body = $scope.post.postBody;
  $scope.forum = $scope.post.postForum;

  $scope.getForums = function getForums() {
    Posts.getSampleForums().then(function(data) {
      $scope.forums = data.data.sort();
      $scope.forums.unshift('Please choose a forum');
    });
  };

  $scope.submit = function() {

    // before sending title and body off to the db, escape
    // any potentially malicious characters
    $scope.title = LaundryService.cleanText($scope.title);
    $scope.body = LaundryService.cleanText($scope.body);

    Posts.editPost($scope.postId, $scope.title,
      $scope.body, $scope.forum, 'Anonymous', new Date());
    $state.go('posts');
  };

  $scope.getForums();
});
