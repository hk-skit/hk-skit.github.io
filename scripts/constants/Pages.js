(function () {
  'use strict';
  var app = angular.module('Codiary');

  //  {
  //    url: 'url to be displayed in the browser and to be used by $routeProvider.when()'
  //    tempalteUrl: 'url for the tempalte'
  //  }
  app.constant('Pages', {
    'home': {
      url: '/home',
      templateUrl: 'views/home.html'
    },
    'coorg-visit': {
      url: '/coorg',
      templateUrl: 'views/posts/coorg-visit.html'
    },
    'this-keyord': {
      url: '/dilemma-of-this',
      templateUrl: 'views/posts/dilemma-of-this.html'
    }
  });
}());