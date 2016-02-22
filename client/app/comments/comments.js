angular.module('hackoverflow.comments', [
  'hackoverflow.services'
])

.controller('CommentsController', function($scope, $stateParams, Comments) {

  $scope.comments = [];

  $scope.postId = $stateParams.id;

  $scope.getComments = function getComments() {
    Comments.getSampleComments($scope.postId).then(function(data) {
        console.log(data.data);
        $scope.comments = data.data;
    });
  };

  $scope.getComments();
});
