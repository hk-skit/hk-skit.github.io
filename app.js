/*global angular*/
(function (params) {
  'use strict';
  angular.module('Codiary', ['ngRoute', 'ngResource', 'hljs']);
}());

(function () {
  'use strict';

  function Config($routeProvider, Pages) {

    //setting routes.
    function forEachPage(page) {
      $routeProvider.when(page.url, {
        templateUrl: page.templateUrl
      });
    }

    angular.forEach(Pages, forEachPage);

    //default route
    $routeProvider
      .otherwise({
        redirectTo: '/home'
      });

  }
  var app = angular.module('Codiary'),
    requires = [
      '$routeProvider',
      'Pages',
      Config
    ];
  app.config(requires);
}());

(function () {
  'use strict';

  function run($rootScope, $location) {
    $rootScope.isHome = function () {
      return $location.path().indexOf('/home') !== -1;
    };
  }
  var app = angular.module('Codiary'),
    requires = [
      '$rootScope',
      '$location',
      run
    ];
  app.run(requires);
}());