/*global angular*/
(function () {
  'use strict';

  function pascalCase() {
    function toPascalCase(value) {
      return value.replace(/(\w)(\w*)/g,
        function (g0, g1, g2) {
          return g1.toUpperCase() + g2.toLowerCase();
        });
    }
    return toPascalCase;
  }
  var app = angular.module('Codiary'),
    requires = [
      pascalCase
    ];
  app.filter('pascalCase', requires);
}());