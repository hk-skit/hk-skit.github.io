(function(){
  'use strict';
  
  function Post(data){
    if(data){
      this.setData(data);
    }
  }
  
  Post.prototype.setData= function(data){
    angular.extend(this, data);
  };
  
  
  function PostService($q, $log, ApiService){
    
    
    function loadPosts(){
    var deferred= $q.defer();
    ApiService.getPosts().then(function(response){
      if(angular.isArray(response.data)){
        deferred.resolve(response.data.map((post)=>{
          return new Post(post);
        }));
      }else{
        $log.error('Seems like there\'s a change in response structure.');
      deferred.resolve([]); 
      }
    }, function(error){
      $log.error('Unable to retrieve posts.', error);
      deferred.reject(error);
    });
    return deferred.promise;
    }
    
    
    function loadPost(postId){
      var deferred=$q.defer();
      ApiService.getPost(postId).then(function(response){
        deferred.resolve(response.data);
      }, function(error){
      $log.error('Unable to retrieve posts.', error);
      deferred.reject(error);
    });
    return deferred.promise;
    }
    
    
    return{
      loadPosts: loadPosts,
      loadPost:loadPost
    };
  }
  
  var app= angular.module('ngCodiaryCore'),
  requires=[
    '$q',
    '$log',
    'ngCodiaryCore.services.ApiService',
    PostService
  ];
  app.factory('ngCodiaryCore.services.PostService', requires);
}());