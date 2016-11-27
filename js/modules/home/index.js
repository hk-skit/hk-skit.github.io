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
      }, function(error){
        vm.quote = {
          quote: 'Something just blew up. Not able to fetch quote ',
          author: 'Codiary'
        };
      });
    }
    
    onLoad();
  }]);
}());