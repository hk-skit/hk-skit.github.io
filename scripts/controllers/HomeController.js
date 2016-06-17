/*global angular*/
(function () {
  'use strict';

  function HomeController($scope, $log, SourceLoader) {

    function onLoad() {
      SourceLoader.getPost().then(function (posts) {
        $scope.posts = posts;
      }, function (error) {
        $log.error('Things are not the way they suppose to be.');
        $log.error(error);
      });
    }

    $scope.filterBy = function (tag) {
      //TODO: Logic for filter by tag.
    };
    onLoad();
  }
  var app = angular.module('Codiary'),
    requires = [
      '$scope',
      '$log',
      'SourceLoader',
      HomeController
    ];
  app.controller('HomeController', requires);
}());