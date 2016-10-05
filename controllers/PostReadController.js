(function(){
  'use strict';
  
  function PostReadController($scope, $routeParams,$log, PostService){
    
    function onLoad(){
      PostService.loadPost($routeParams.postId).then(function(post){
        $scope.post= post;
      }, function(error){
        //TODO: Use toaster to infor user.
        $log.info('Unable to load post.');
        $log.error(error);
      });
    }
    
    $scope.post={};
    
    onLoad();
    
  }
  
  var app= angular.module('Codiary'),
  requires=[
    '$scope',
    '$routeParams',
    '$log',
    'ngCodiaryCore.services.PostService',
    PostReadController
    ];
  app.controller('PostReadController', requires);
}());