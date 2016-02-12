(function () {
    'use strict';
    angular
        .module('KnowledgeCenter')
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
                url: '/questions/',
                templateUrl: './templates/posts.html',
                controller: 'QuestionsCtrl'
            })

            .state('things i learnt today', {
                url: '/things-I-learnt-today/',
                templateUrl: './templates/posts.html',
                controller: 'TILTCtrl'
            })

            .state('links', {
                url: '/links/',
                templateUrl: './templates/posts.html',
                controller: 'LinksCtrl'
            })

            .state('guides', {
                url: '/guides/',
                templateUrl: './templates/posts.html',
                controller: 'GuidesCtrl'
            })

            .state('post', {
                url: '/post/:postId',
                templateUrl: './templates/post.html',
                controller: 'PostCtrl'
            })

            .state('create-new-post', {
                url: '/create-new-post/:category',
                templateUrl: './templates/createPost.html',
                controller: 'NewPostCtrl'
            })

    }

})();