/**
 * Created by Eran Reuveni on 09/02/2016.
 */
(function () {
    'use strict';
    angular
        .module('adminConsole')
        .run(run)
        .config(config);

    run.$inject = ['$rootScope', '$state', '$stateParams'];
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function run($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/');

        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: '/templates/admin-home.html',
                controller: 'homeController'
            })

            .state('users', {
                url: '/users',
                templateUrl: '/templates/admin-users.html',
                controller: 'usersController'
            })

            .state('posts', {
                url: '/posts/:category',
                templateUrl: '/templates/admin-posts.html',
                controller: 'postsController'
            })

            .state('edit', {
                url: '/edit/:userIndex',
                templateUrl: '/templates/admin-edit-user.html',
                controller: 'editController'
            })



    }


})();