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
                templateUrl: './templates/home.html',
                controller: 'homeController'

            })

            .state('questions', {
                url: '/questions',
                templateUrl: './templates/posts.html',
                controller: 'questionsController'
            })

            .state('things i learnt today', {
                url: '/things-I-learnt-today',
                templateUrl: './templates/posts.html',
                controller: 'things-i-learnt-todayController'
            })

            .state('links', {
                url: '/links',
                templateUrl: './templates/posts.html',
                controller: 'linksController'
            })

            .state('guides', {
                url: '/guides',
                templateUrl: './templates/posts.html',
                controller: 'guidesController'
            })

            .state('post', {
                url: '/post/:postId',
                templateUrl: './templates/post.html',
                controller: 'postController'
            })

    }


})();