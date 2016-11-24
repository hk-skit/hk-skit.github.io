(function(){
  'use strict';
  var app = angular.module('codiary.home', [
      'codiary.api.quote'
    ]);
  app.controller('HomeController', [ 'QuoteFactory', function(QuoteFactory){
    var vm = this;
    
    function onLoad(){
      QuoteFactory.get(function(quote){
        vm.quote = quote;
      });
    }
    
    onLoad();
  }]);
}());