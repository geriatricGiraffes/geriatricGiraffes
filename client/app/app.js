angular.module('hackoverflow', [
  'hackoverflow.services',
  'hackoverflow.posts',
  'ngRoute',
  'ui.router'
])
.config(function($routeProvider, $httpProvider, $urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/posts');
  $stateProvider
    .state('posts', {
      url: '/posts',
      templateUrl: 'app/posts/posts.html',
      controller: 'PostsController'
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
