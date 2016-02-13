(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('PostsCtrl', PostsCtrl);

    PostsCtrl.$inject = ['$scope', '$stateParams', 'APIService'];

    /* @ngInject */
    function PostsCtrl($scope, $stateParams, APIService) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.activate = activate;

        activate();

        ////////////////

        function activate() {
            console.log('posts controller')
            vm.category = $stateParams.category
            APIService.getAllPostsFilteredByCategory(vm.category, function(questions) {
                vm.dbPosts = questions.data
            })
        }
    }
})();