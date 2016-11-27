/*global angular*/
(function () {
  'use strict';
  var app = angular.module('codiary', [
    'ui.router',
    'codiary.home'
  ]);
  app.config([
    '$urlRouterProvider',
    '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html'
        })
        .state('about', {
          url: '/about',
          templateUrl: 'views/about.html'
        })
        .state('blog', {
          url: '/blog',
          template: '<h1>blog Page</h1>'
        })
        .state('other', {
          url: '/other',
          template: '<h1>Other Page</h1>'
        })
        .state('photos', {
          url: '/photos',
          template: '<h1>photos Page</h1>'
        });
      $urlRouterProvider.otherwise('/home');
    }
  ]);
}());