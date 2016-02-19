angular.module('shortly', [
  'shortly.services',
  'ngRoute',
  'ui.router'
])
.config(function($routeProvider, $httpProvider, $urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/links');
  $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
})
