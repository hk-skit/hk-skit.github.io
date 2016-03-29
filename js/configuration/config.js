/*global angular*/
(function() {
    'use strict';

    /**
     * Config for the app module. It is responsible for routes in app.
     * 
     * @param   {object} $routeProvider     service to delegate routes.
     * @param   {object}   $locationProvider  
     * @param   {object} $translateProvider 
     * @param   {object}   $httpProvider
     */
    function Config($routeProvider) {

        //Route Provider
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            }).when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutController'
            }).otherwise({
                redirectTo: '/'
            });
    }



    var app = angular.module('app');
    app.config(['$routeProvider', Config]);

} ());
