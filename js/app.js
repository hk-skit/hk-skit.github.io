/**
 * Application module definition.
 */
(function () {
    'use strict';
    angular.module('smellycode', []);
})();

(function () {
    /**
     * MainController will we used as controller "as".
     */
    function MainController() {
        this.greetings = 'Hola!';

    }
    var app = angular.module('smellycode');
    app.controller('MainController', [
        MainController
    ]);
})();
