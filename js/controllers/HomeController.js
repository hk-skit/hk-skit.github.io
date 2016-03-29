(function() {
    'use strict';

    function HomeController($scope, $log) {

        $scope.hello = 'Hi! Learning web developement.';

    }

    var app = angular.module('app');
    app.controller('HomeController', ['$scope', '$log', HomeController]);

} ());