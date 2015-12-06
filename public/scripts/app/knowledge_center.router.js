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
                templateUrl: './templates/questions.html'
            })

            .state('things i learnt today', {
                url: '/things-I-learnt-today',
                templateUrl: './templates/things-i-learnt-today.html'
            })

            .state('links', {
                url: '/links',
                templateUrl: './templates/links.html'
            })

            //.state('suppliers', {
            //    url: '/api/v1/tender/esg/suppliers/',
            //    templateUrl: '/static-tender/app/suppliers.html'
            //})
            //.state('connections', {
            //    url: '/api/v1/tender/esg/connections/',
            //    templateUrl: '/static-tender/app/connections.html'
            //})
    }


})();