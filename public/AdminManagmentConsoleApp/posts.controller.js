/**
 * Created by Eran Reuveni on 14/02/2016.
 */
(function () {
    'use strict';

    angular
        .module('adminConsole')
        .controller('postsController', adminPosts);

    adminPosts.$inject = ['dataService','$stateParams', "$scope"];

    /* @ngInject */
    function adminPosts(dataService,$stateParams, $scope) {

        var vm = $scope;
        $scope.category = $stateParams.category.toLowerCase();


        dataService.getAllPostsFilteredByCategory($scope.category, function(questions){
            vm.dbPosts = questions.data
            console.log(vm.dbPosts);
            $('#loader').hide();
            $('#userList').show();
        });

        $scope.deletePost = function(index){

            //TODO create api
           var deleted = $scope.splice(index,1);

        }


    }

})();