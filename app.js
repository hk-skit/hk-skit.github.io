(function(){
  'use strict';
  
  var app= angular.module('Codiary', [
    
    'ngRoute',
    'ngCodiaryCore'
    
    ]);
  
  function config($routeProvider, Routes){
    
    
    //configuring routes
    function forEachRoute(route){
      $routeProvider.when(route.url, {
        templateUrl: route.templateUrl
      });
    }
    
    //default route
    $routeProvider
      .otherwise({
        redirectTo: '/home'
      });
    angular.forEach(Routes, forEachRoute);
    
  }
  
  app.config(['$routeProvider','Routes', config]);
  
}());