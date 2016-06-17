/*global angular*/
(function () {
  'use strict';

  function ngCodiaryPostTile() {
    function linkFn() {

    }
    return {
      restrict: 'E',
      scope: {
        post: '='
      },
      templateUrl: 'views/post-tile.html',
      link: linkFn
    };
  }

  var app = angular.module('Codiary'),
    requires = [
      ngCodiaryPostTile
    ];

  app.directive('ngCodiaryPostTile', requires);

}());