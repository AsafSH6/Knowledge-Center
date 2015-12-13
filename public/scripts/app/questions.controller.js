(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('questions', questions);

    questions.$inject = ['$scope', 'knowledgeCenterServiceCtrl'];

    /* @ngInject */
    function questions($scope, dataService) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.activate = activate;
        vm.category = 'Questions';

        activate();

        ////////////////

        function activate() {
            dataService.getAllPostsFilteredByCategory(vm.category, function(questions) {
                vm.dbPosts = questions.data
                console.log('posts')
                console.log(vm.dbPosts)
            })
        }
    }
})();