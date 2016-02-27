angular.module('hackoverflow', [
  'hackoverflow.services',
  'hackoverflow.posts',
  'hackoverflow.add-post',
  'hackoverflow.edit-post',
  'hackoverflow.comments',
  'ui.router',
  'ngRoute',
  'ngSanitize'
])

.run(function($rootScope) {

  // this global user variable is a stopgap measure
  // until github authentication is implemented
  if (!$rootScope.user) {
    $rootScope.user = prompt('What is your name?');
    if (!$rootScope.user) {
      $rootScope.user = 'Anonymous';
    }
  }

  $rootScope.$on("$routeChangeStart",
    function (event, next, current) {

    if (sessionStorage.restorestate == "true") {

      //let everything know we need to restore state
      $rootScope.$broadcast('restorestate');
      sessionStorage.restorestate = false;
    }
  });

  //let everthing know that we need to save state now.
  window.onbeforeunload = function (event) {
    $rootScope.$broadcast('savestate');
  };
})

.controller('AppController', function($scope, $location) {

  // this ensures that application fully reboots and
  // defaults to main page if user reloads a page.
  $location.path("/");
})

.config(function($httpProvider, $urlRouterProvider,
  $stateProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('posts');
  $stateProvider
    .state('posts', {
      params: {'forum': 'Angular'},
      url: '/',
      templateUrl: 'app/posts/posts.html',
      controller: 'PostsController'
    })
    .state('add-post', {
      // url: '/add-post',
      templateUrl: 'app/posts/add-post.html',
      controller: 'AddPostController'
    })
    .state('edit-post', {
      params: {'post': null},
      // url: '/edit-post',
      templateUrl: 'app/posts/add-post.html',
      controller: 'EditPostController'
    })
    .state('comments', {
      params: {'post': null},
      // url: '/comments',
      templateUrl: 'app/comments/comments.html',
      controller: 'CommentsController'
    })
    .state('signin', {
      // url: '/signin',
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .state('signup', {
      // url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    });
});
