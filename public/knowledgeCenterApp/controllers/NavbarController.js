(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['APIService'];

    /* @ngInject */
    function NavbarCtrl(APIService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'navbar';
        vm.homeUrl = '/';
        vm.currentActive = -1;

        activate();

        ////////////////

        function activate() {
            APIService.getAllCategories(function(categories) {
                vm.dbCategories = categories.data
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