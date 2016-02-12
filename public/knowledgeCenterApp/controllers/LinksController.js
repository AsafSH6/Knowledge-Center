(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('LinksCtrl', LinksCtrl);

    LinksCtrl.$inject = ["$scope", 'APIService'];

    /* @ngInject */
    function LinksCtrl($scope, APIService) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.activate = activate;
        vm.category = 'Links';

        activate();

        ////////////////

        function activate() {
            APIService.getAllPostsFilteredByCategory(vm.category, function(links) {
                vm.dbPosts = links.data
            })
        }
    }
})();