(function () {
    'use strict';
    angular
        .module('knowledgeCenter')
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
                templateUrl: './templates/home.html'
            })

            .state('questions', {
                url: '/questions',
                templateUrl: './templates/posts.html',
                controller: 'questions'
            })

            .state('things i learnt today', {
                url: '/things-I-learnt-today',
                templateUrl: './templates/posts.html',
                controller: 'things-i-learnt-today'
            })

            .state('links', {
                url: '/links',
                templateUrl: './templates/posts.html',
                controller: 'links'
            })

            .state('guides', {
                url: '/guides',
                templateUrl: './templates/posts.html',
                controller: 'guides'
            })

    }


})();