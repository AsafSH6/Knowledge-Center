/**
 * Created by Eran Reuveni on 13/02/2016.
 */
(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('homeController', links);

    links.$inject = ['dataService', "$scope"];

    /* @ngInject */
    function links(dataService, $scope) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.activate = activate;
        vm.dbCategories = dataService.dbCategories;

        activate();

        ////////////////

        function activate() {
            dataService.getAllNewPosts( function(links) {
                vm.newPosts = links.data
                console.log(vm.newPosts)
            })


        }
    }
})();