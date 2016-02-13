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
            .state('admin', {
                url: '/admin',
                templateUrl: './templates/admin.html'
            })

            .state('users', {
                url: '/users',
                templateUrl: './templates/admin-users.html',
                controller: 'usersController'
            })

            .state('posts', {
                url: '/posts',
                templateUrl: './templates/posts.html',
                controller: 'postsController'
            })

            .state('edit', {
                url: '/edit/:userIndex',
                templateUrl: './templates/admin-edit-user.html',
                controller: 'editController'
            })



    }


})();