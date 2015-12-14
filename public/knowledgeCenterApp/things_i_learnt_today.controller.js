(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('things-i-learnt-todayController', thingsILearntToday);

    thingsILearntToday.$inject = ['dataService', '$scope'];

    /* @ngInject */
    function thingsILearntToday(dataService, $scope) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.activate = activate;
        vm.category = 'Things I learnt today';

        activate();

        ////////////////

        function activate() {
            dataService.getAllPostsFilteredByCategory(vm.category, function(tild) {
                vm.dbPosts = tild.data
                console.log(vm.dbPosts)
            })
        }
    }
})();