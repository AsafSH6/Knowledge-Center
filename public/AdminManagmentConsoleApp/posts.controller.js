//Template for this controller: admin-posts.html.
// presents all the posts, gives the admin an option to delete them.
(function () {
    'use strict';

    angular
        .module('adminConsole')
        .controller('postsController', adminPosts);

    adminPosts.$inject = ['$rootScope', '$state', 'dataService','$stateParams', "$scope"];

    /* @ngInject */
    function adminPosts($rootScope, $state,dataService,$stateParams, $scope) {
        console.log("posts")


        $scope.category = $stateParams.category;


        dataService.getAllPostsFilteredByCategory($scope.category, function(questions){
            $scope.posts = questions.data;
        });

        $scope.deletePost = function(index){
            dataService.deletePost($scope.posts[index]._id, function() {
                $scope.posts.splice(index, 1)
            })

        }

        function isLoggedIn() {
            if(!$rootScope.globals.loggedIn) {
                $state.go('login')
            }
        }
        isLoggedIn()


    }

})();