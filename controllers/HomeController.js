(function(){
  'use strict';
  
  function HomeController($scope, $log,$location, PostService){
    $scope.posts=[];
    
    function onLoad(){
    PostService.loadPosts().then(function(posts){
      Array.prototype.push.apply($scope.posts, posts);
    }, function(error){
      $log.error('Something just blew up... Please call 911.:D');
      $log.log(error);
    });  
    }
    
    $scope.go=function(postId){
      $location.path('post-read/'+postId);
    };
    
    //All set lets load stuff.
    onLoad();
  }
  
  var app= angular.module('Codiary'),
  requires=[
    '$scope', 
    '$log',
    '$location',
    'ngCodiaryCore.services.PostService',
    HomeController
    ];
  app.controller('HomeController', requires);
}());