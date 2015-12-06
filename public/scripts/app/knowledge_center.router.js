//(function () {
//    'use strict';
//    angular
//        .module('knowledgeCenter')
//        .run(run)
//        .config(config);
//
//    run.$inject = ['$rootScope', '$state', '$stateParams'];
//    config.$inject = ['$stateProvider', '$urlRouterProvider'];
//
//    function run($rootScope, $state, $stateParams) {
//        $rootScope.$state = $state;
//        $rootScope.$stateParams = $stateParams;
//    }
//
//    function config($stateProvider, $urlRouterProvider) {
//        $urlRouterProvider
//            .otherwise('/test');
//
//        $stateProvider
//            .state('navbar', {
//                url: '/api/v1/tender/esg/',
//                templateUrl: '/static-tender/app/tender.html'
//            })
//
//            .state('suppliers', {
//                url: '/api/v1/tender/esg/suppliers/',
//                templateUrl: '/static-tender/app/suppliers.html'
//            })
//            .state('connections', {
//                url: '/api/v1/tender/esg/connections/',
//                templateUrl: '/static-tender/app/connections.html'
//            })
//    }
//
//
//})();