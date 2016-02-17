//Template for this controller: admin-posts.html.
// presents all the posts, gives the admin an option to delete them.
(function () {
    'use strict';

    angular
        .module('adminConsole')
        .controller('postsController', adminPosts);

    adminPosts.$inject = ['dataService','$stateParams', "$scope"];

    /* @ngInject */
    function adminPosts(dataService,$stateParams, $scope) {
        console.log("posts")


        $scope.category = $stateParams.category;


        dataService.getAllPostsFilteredByCategory($scope.category, function(questions){
            $scope.posts = questions.data;
            console.log($scope.dbPosts);
        });

        $scope.deletePost = function(index){

            //TODO create api
           var deleted = $scope.splice(index,1);

        }


    }

})();