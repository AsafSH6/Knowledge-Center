(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('QuestionsCtrl', QuestionsCtrl);

    QuestionsCtrl.$inject = ['$scope', 'APIService'];

    /* @ngInject */
    function QuestionsCtrl($scope, APIService) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.activate = activate;
        vm.category = 'Questions';

        activate();

        ////////////////

        function activate() {
            APIService.getAllPostsFilteredByCategory(vm.category, function(questions) {
                vm.dbPosts = questions.data
            })
        }
    }
})();