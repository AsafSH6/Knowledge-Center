(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('PostsCtrl', PostsCtrl);

    PostsCtrl.$inject = ['$rootScope', '$scope', '$stateParams', 'APIService'];

    /* @ngInject */
    function PostsCtrl($rootScope, $scope, $stateParams, APIService) {
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
                if(vm.dbPosts != undefined)
                    vm.posts = vm.dbPosts.slice(0, vm.postsPerPage)
                vm.nextPage = nextPage
                vm.previousPage = previousPage
                socketIOListenToNewPosts()
            }
            else {
                APIService.getAllPostsFilteredByCategory(vm.category, function(posts) {
                    vm.postsPerPage = 5
                    vm.currentPage = 0
                    vm.dbPosts = posts.data
                    vm.posts = vm.dbPosts.slice(0, vm.postsPerPage)
                    vm.nextPage = nextPage
                    vm.previousPage = previousPage
                    socketIOListenToNewPosts()
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

        function socketIOListenToNewPosts() {
            if(socketIO != undefined) {
                socketIO.on(vm.category, function(post) {
                    console.log('new post')
                    APIService.insertPost(post)
                    vm.posts.unshift(post)
                    vm.$apply()
                    console.log(vm.posts)
                })
                console.log('listing to: ' + vm.category)
            }
        }
    }
})();