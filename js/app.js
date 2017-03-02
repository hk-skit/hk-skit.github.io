/**
 * Application module definition.
 */
(function () {
    'use strict';
    angular.module('smellycode', []);
})();

(function () {
    'use strict';

    function PostsFactory($http) {
        var post_api = 'assets/json/posts.json';

        function getPosts() {
            return $http.get(post_api).then(function (response) {
                return response.data;
            }, function (error) {
                return error;
            });
        }
        return {
            getPosts: getPosts
        };
    }
    var app = angular.module('smellycode');
    app.factory('PostsFactory', ['$http', PostsFactory])
})();

(function () {
    /**
     * MainController will we be used as controller "as".
     */
    function MainController($log, PostsFactory) {
        var self = this;
        self.posts = [];
        PostsFactory.getPosts().then(function (posts) {
            Array.prototype.push.apply(self.posts, posts);
        }, function (error) {
            //TODO: Notify user that something blew up..
            $log.error(error);
        });
    }
    var app = angular.module('smellycode');
    app.controller('MainController', [
        '$log',
        'PostsFactory',
        MainController
    ]);
})();
