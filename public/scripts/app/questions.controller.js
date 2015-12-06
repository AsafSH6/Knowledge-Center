(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('questions', questions);

    questions.$inject = ['knowledgeCenterServiceCtrl'];

    /* @ngInject */
    function questions(dataService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.category = 'Questions';

        activate();

        ////////////////

        function activate() {
            dataService.getAllPostsFilteredByCategory(vm.category, function(questions) {
                vm.dbQuestions = questions.data
                console.log(vm.dbQuestions)
            })
        }
    }
})();