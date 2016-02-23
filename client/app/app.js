angular.module('hackoverflow', [
  'hackoverflow.services',
  'hackoverflow.posts',
  'hackoverflow.comments',
  'ui.router'
])

.controller('AppController', function($scope) {


})

.config(function($httpProvider, $urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/posts');
  $stateProvider
    .state('posts', {
      url: '/posts',
      templateUrl: 'app/posts/posts.html',
      controller: 'PostsController'
    })
    .state('comments', {
      url: '/posts/:id',
      templateUrl: 'app/comments/comments.html',
      controller: 'CommentsController'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    });
});
