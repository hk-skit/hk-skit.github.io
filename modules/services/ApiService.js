(function(){
  'use strict';
  var app= angular.module('ngCodiaryCore');
  
  app.provider('ngCodiaryCore.services.ApiService', function(){
    
    var self= this;
    
    function ApiService($http){
      
      var assetApi= 'assets/';
      
      function getPosts(){
        return $http.get(assetApi+'posts.json');
      }
      
      
      function getPost(postId){
        return $http.get(assetApi+postId+'.json');
      }
      
      return {
        getPosts: getPosts,
        getPost:getPost
      };
    }
    
    self.$get=['$http', ApiService];
    
  });
}());