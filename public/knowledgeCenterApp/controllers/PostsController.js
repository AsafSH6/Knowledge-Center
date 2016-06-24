(function () {
    'use strict';
// Template: posts.html.
// shows all the users.
// uses paging, default posts per page 9

    angular
        .module('KnowledgeCenter')
        .controller('PostsCtrl', PostsCtrl);

    PostsCtrl.$inject = ['$rootScope', '$scope', '$stateParams', '$state', 'APIService'];

    /* @ngInject */
    function PostsCtrl($rootScope, $scope, $stateParams, $state, APIService) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.activate = activate;

        activate();

        ////////////////

        function activate() {
            vm.category = $stateParams.category
            vm.postsPerPage = 9
            vm.currentPage = 0
            if(vm.category == 'Search') {
                vm.dbPosts = $stateParams.posts
                if(vm.dbPosts != undefined)
                    vm.posts = vm.dbPosts.slice(0, vm.postsPerPage)

            }
            else {
                APIService.getAllPostsFilteredByCategory(vm.category, function(posts) {
                    vm.dbPosts = posts
                    vm.posts = vm.dbPosts.slice(0, vm.postsPerPage)
                })
            }
            vm.nextPage = nextPage
            vm.previousPage = previousPage
            vm.searchByTag = searchByTag
            socketIOListenToNewPosts()
        }
        function searchByTag(tag) {
            APIService.search({category: '', tag: tag, text: ''}, function(posts) {
                $state.go('posts', {category: 'Search', posts: posts})
            })
        }

        function nextPage() {
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
                    APIService.insertPost(post)
                    vm.posts.unshift(post)
                    vm.$apply()
                })
            }
        }
    }
})();