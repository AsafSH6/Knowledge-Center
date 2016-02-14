/**
 * Created by Eran Reuveni on 13/02/2016.
 */
(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['APIService', "$scope"];

    /* @ngInject */
    function homeCtrl(APIService, $scope) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.activate = activate;
        vm.dbCategories = APIService.dbCategories;

        activate();

        ////////////////

        function activate() {
            APIService.getAllNewPosts( function(links) {
                vm.newPosts = links.data
                console.log(vm.newPosts)
            })


        }
    }
})();