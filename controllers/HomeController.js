(function(){
  'use strict';
  
  function HomeController($scope, PostService){
    $scope.posts=[];
    PostService.loadPosts().then(function(posts){
      Array.prototype.push.apply($scope.posts, posts);
    }, function(){
      console.log(arguments);
    });
  }
  
  var app= angular.module('Codiary'),
  requires=[
    '$scope', 
    'ngCodiaryCore.services.PostService',
    HomeController
    ];
  app.controller('HomeController', requires);
}());