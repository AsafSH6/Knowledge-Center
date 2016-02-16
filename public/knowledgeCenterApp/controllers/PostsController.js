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
            if(vm.category == 'Search') {
                vm.postsPerPage = 5
                vm.currentPage = 0
                console.log($stateParams.posts)
                vm.dbPosts = $stateParams.posts
                vm.posts = vm.dbPosts.slice(0, vm.postsPerPage)
                vm.nextPage = nextPage
                vm.previousPage = previousPage
            }
            else {
                APIService.getAllPostsFilteredByCategory(vm.category, function(posts) {
                    vm.postsPerPage = 5
                    vm.currentPage = 0
                    vm.dbPosts = posts.data
                    vm.posts = vm.dbPosts.slice(0, vm.postsPerPage)
                    vm.nextPage = nextPage
                    vm.previousPage = previousPage
                })
            }
        }

        function nextPage() {
            console.log('next page')
            if((vm.currentPage + 1) * vm.postsPerPage >= vm.dbPosts.length)
                return
            vm.currentPage += 1
            var beginning = vm.currentPage * vm.postsPerPage
            var end = (vm.currentPage + 1) * vm.postsPerPage

            if(beginning >= vm.dbPosts.length)
                beginning = vm.dbPosts.length - 1

            vm.posts = vm.dbPosts.slice(beginning, end)
        }

        function previousPage() {
            console.log('previous page')
            if(vm.currentPage - 1 >= 0) {
                vm.currentPage -= 1
            }
            else {
                return
            }
            var beginning = vm.currentPage * vm.postsPerPage
            var end = (vm.currentPage + 1) * vm.postsPerPage
            if(end < 0)
                end = 1

            vm.posts = vm.dbPosts.slice(beginning, end)
        }
    }
})();