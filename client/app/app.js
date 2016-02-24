angular.module('hackoverflow', [
  'hackoverflow.services',
  'hackoverflow.posts',
  'hackoverflow.add-post',
  'hackoverflow.comments',
  'ui.router',
  'ngRoute'
])

.controller('AppController', function($scope, $location) {

  // this ensures that application fully reboots and
  // defaults to main page if user reloads a page. 
  $location.path("/");
})

.config(function($httpProvider, $urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/posts');
  $stateProvider
    .state('posts', {
      url: '/posts',
      templateUrl: 'app/posts/posts.html',
      controller: 'PostsController'
    })
    .state('add-post', {
      url: '/add-post',
      templateUrl: 'app/posts/add-post.html',
      controller: 'AddPostController'
    })
    .state('comments', {
      params: {'post': null},
      url: '/comments',
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
