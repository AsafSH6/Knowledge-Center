(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('navbar', navbar);

    navbar.$inject = ['knowledgeCenterServiceCtrl'];

    /* @ngInject */
    function navbar(dataService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'navbar';
        vm.homeUrl = '/';
        vm.setActive = setActivate;
        vm.checkActive = checkActive;
        vm.currentActiveCategory = currentActiveCategory;
        vm.getCategoryTemplate = getCategoryTemplate;
        vm.currentActive = -1;

        activate();

        ////////////////

        function activate() {
            dataService.getAllCategories(function(categories) {
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

        function currentActiveCategory() {
            return vm.dbCategories[number]
        }

        function getCategoryTemplate() {
            var template = vm.currentActive == -1 ? './templates/home.html' : './templates/' + (currentActiveCategory() | lowercase) + 'html'
            console.log(template)
            return template
        }


    }
})();