(function(){
  'use strict';
  
  function PostReadController($scope, $routeParams){
    console.log($routeParams.postId, $routeParams);
  }
  
  var app= angular.module('Codiary'),
  requires=[
    '$scope',
    '$routeParams',
    PostReadController
    ];
  app.controller('PostReadController', requires);
}());