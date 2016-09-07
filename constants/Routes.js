(function () {
  'use strict';
  var app = angular.module('Codiary');

  //  {
  //    url: 'url to be displayed in the browser and to be used by $routeProvider.when()'
  //    tempalteUrl: 'url for the tempalte'
  //  }
  app.constant('Routes', {
    'home': {
      url: '/home',
      templateUrl: 'views/home.html'
    },
    'album': {
      url: '/album',
      templateUrl: 'views/album.html'
    },
    'about': {
      url: '/about',
      templateUrl: 'views/about.html'
    },
    'open-source-libs': {
      url: '/open-source-libs',
      templateUrl: 'views/open-source-libs.html'
    }
  });
}());