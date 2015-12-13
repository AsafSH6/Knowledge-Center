(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .factory('UserService', userService);

    userService.$inject = ['$http'];

    /* @ngInject */
    function userService($http) {
        var service = {

        };

        return service;

        ////////////////

    }
})
();