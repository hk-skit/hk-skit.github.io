(function(){
  'use strict';
  var app= angular.module('ngCodiaryCore');
  
  app.provider('ngCodiaryCore.services.ApiService', function(){
    
    var self= this;
    
    function ApiService($http){
      
      var postApi= 'assets/posts.json';
      
      function getPosts(){
        return $http.get(postApi);
      }
      return {
        getPosts: getPosts
      };
    }
    
    self.$get=['$http', ApiService];
    
  });
}());