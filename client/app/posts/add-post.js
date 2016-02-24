angular.module('hackoverflow.add-post', [
  'hackoverflow.services',
  'ui.router'
])

.config(function($stateProvider) {
})

.controller('AddPostController', function($scope, $state, Posts, LaundryService) {

  $scope.title = '';
  $scope.body = '';
  $scope.forums = [];
  $scope.forum = 'Please choose a forum';

  $scope.getForums = function getForums() {
    Posts.getSampleForums().then(function(data) {
      console.log(data.data);
      $scope.forums = data.data.sort();
      $scope.forums.unshift('Please choose a forum');
    });
  };

  $scope.submit = function() {

    // before sending title and body off to the db, escape
    // any potentially malicious characters
    $scope.title = LaundryService.cleanText($scope.title);
    $scope.body = LaundryService.cleanText($scope.body);

    Posts.createPost($scope.title, $scope.body, $scope.forum);
    $state.go('posts');
  };

  $scope.getForums();
});
