angular.module('hackoverflow.posts', [
  'hackoverflow.services'
])
.controller('PostsController', function ($scope, Posts) {
  $scope.posts= [
    {
      author: 'Spiney Norman',
      title: 'What is up with Angular and injection?',
      data: '5/2/15'
    },
    {
      author: 'Bobby Bobson',
      title: 'Never forget the tibbles.',
      data: '5/2/15'
    },
    {
      author: 'Mr. Fancy Pants',
      title: 'Star Wars will never end.',
      data: '5/2/15'
    },
    {
      author: 'Gerry Geriatric',
      title: 'Bobby Bobson. What a name.',
      data: '5/2/15'
    }
  ];

  $scope.sort = function(arg) {
  }

  $scope.logout = function logout() {
    Auth.signout();
  }

  $scope.getPosts = function getPosts() {
    Posts.getPosts().then(function(data) {
      $scope.posts = data;
    })
  }
//  $scope.getPosts();
});
