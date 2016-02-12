(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('TILTCtrl', TILTCtrl);

    TILTCtrl.$inject = ['$scope', 'APIService'];

    // TILT: Thins I Learnt Today
    /* @ngInject */
    function TILTCtrl($scope, APIService) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.activate = activate;
        vm.category = 'Things I learnt today';

        activate();

        ////////////////

        function activate() {
            APIService.getAllPostsFilteredByCategory(vm.category, function(tild) {
                vm.dbPosts = tild.data
            })
        }
    }
})();