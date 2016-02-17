//Ui-Router
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
            .state('login', {
                url: '/',
                templateUrl: '/templates/admin-login.html',
                controller: 'authenticationCtrl',
            })

            .state('home', {
                url: '/home/',
                templateUrl: '/templates/admin-home.html'

            })

            .state('map', {
                url: '/map/',
                templateUrl: '/templates/admin-map.html',
                controller: 'mapController'
            })

            .state('tags', {
                url: '/tags/',
                templateUrl: '/templates/admin-tags.html',
                controller: 'tagsController'
            })

            .state('users', {
                url: '/users/',
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