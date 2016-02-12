(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('GuidesCtrl', GuidesCtrl);

    GuidesCtrl.$inject = ['$scope', 'APIService'];

    /* @ngInject */
    function GuidesCtrl($scope, APIService) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.activate = activate;
        vm.category = 'Guides';

        activate();

        ////////////////

        function activate() {
            APIService.getAllPostsFilteredByCategory(vm.category, function(guides) {
                vm.dbPosts = guides.data
            })
        }
    }
})();