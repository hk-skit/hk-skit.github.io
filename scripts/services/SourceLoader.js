/*global angular*/
(function () {
  'use strict';

  function SourecLoader($q, $http, $log) {
    var postUrl = 'assets/posts.json',
      posts = [];

    function getPost() {
      var deferred = $q.defer();
      if (posts.length > 0) {
        deferred.resolve(posts);
      } else {
        $http.get(postUrl).then(function (response) {
          //merging array using push
          Array.prototype.push.apply(posts, response.data);
          deferred.resolve(posts);
        }, function (error) {
          deferred.reject(error);
        });
      }
      return deferred.promise;
    }

    return {
      getPost: getPost
    };
  }

  var app = angular.module('Codiary'),
    requires = [
      '$q',
      '$http',
      '$log',
      SourecLoader
    ];
  app.factory('SourceLoader', requires);
}());