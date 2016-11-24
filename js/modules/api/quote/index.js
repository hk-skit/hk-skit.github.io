(function(){
  'use strict';
  var app = angular.module('codiary.api.quote', ['ngResource']);
  app.factory('QuoteFactory', ['$resource', function($resource){
    var api= 'http://quotesondesign.com/api/3.0/api-3.0.json';
    var quote = $resource(api);
    return quote;
  }]);
}());