(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('navbar', navbar);

    navbar.$inject = ['knowledgeCenterServiceCtrl'];

    /* @ngInject */
    function navbar(knowledgeCenterServiceCtrl) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'navbar';
        vm.homeUrl = '/'
        vm.setActive = setActivate;
        vm.checkActive = checkActive;
        vm.currentActive = -1;

        activate();

        ////////////////

        function activate() {
            console.log('activate')
            knowledgeCenterServiceCtrl.getAllCategories(function(categories) {
                vm.dbCategories = categories.data
                console.log(vm.dbCategories)
            })
        }

        function setActivate(number){
            vm.currentActive = number
        }

        function checkActive(number){
            return  (vm.currentActive == number)
        }


    }
})();