(function () {
    'use strict';

    angular
        .module('adminConsole')
        .controller('sidebarController', navbar);

    navbar.$inject = ['dataService'];

    /* @ngInject */
    function navbar(dataService) {

        var vm = this;

        vm.activate = activate;
        vm.title = 'navbar';
        vm.homeUrl = '/';
        vm.currentActive = -1;

        activate();



        function activate() {
            dataService.getAllCategories(function(categories) {
                vm.dbCategories = categories.data
                console.log(vm.dbCategories)
            })
        }
    }
})();