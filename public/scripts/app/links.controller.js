(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('links', links);

    links.$inject = ['knowledgeCenterServiceCtrl'];

    /* @ngInject */
    function links(dataService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.category = 'Links';

        activate();

        ////////////////

        function activate() {
            dataService.getAllPostsFilteredByCategory(vm.category, function(links) {
                vm.dbLinks = links.data
                console.log(vm.dbLinks)
            })
        }
    }
})();