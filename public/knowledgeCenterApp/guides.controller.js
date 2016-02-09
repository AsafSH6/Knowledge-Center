(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('guidesController', guides);

    guides.$inject = ['knowledgeCenterServiceCtrl', '$scope'];

    /* @ngInject */
    function guides(dataService, $scope) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.activate = activate;
        vm.category = 'Guides';

        activate();

        ////////////////

        function activate() {
            dataService.getAllPostsFilteredByCategory(vm.category, function(guides) {
                vm.dbPosts = guides.data
                console.log("guides posts: ")
                console.log(vm.dbPosts)
            })
        }
    }
})();