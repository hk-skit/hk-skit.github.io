(function(){
  'use strict';
  var app = angular.module('codiary.api.quote', ['ngResource']);
  app.factory('QuoteFactory', ['$resource', function($resource){
    var api= 'http://quotes.stormconsultancy.co.uk/random.json';
    var quote = $resource(api);
    return quote;
  }]);
}());