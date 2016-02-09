(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('navbarController', navbar);

    navbar.$inject = ['dataService'];

    /* @ngInject */
    function navbar(dataService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'navbar';
        vm.homeUrl = '/';
        vm.currentActive = -1;

        activate();

        ////////////////

        function activate() {
            dataService.getAllCategories(function(categories) {
                vm.dbCategories = categories.data
                console.log("categories: ")
                console.log(vm.dbCategories)
            })
            vm.setActive = setActivate;
            vm.checkActive = checkActive;
        }

        function setActivate($index){
            vm.currentActive = $index
        }

        function checkActive($index){
            return  (vm.currentActive == $index)
        }

    }
})();