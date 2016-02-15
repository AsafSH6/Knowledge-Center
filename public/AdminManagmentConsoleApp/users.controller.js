/**
 * Created by Eran Reuveni on 09/02/2016.
 */
(function () {
    'use strict';

    angular
        .module('adminConsole')
        .controller('usersController', adminPosts);

    adminPosts.$inject = ['dataService', "$scope"];

    /* @ngInject */
    function adminPosts(dataService, $scope) {



        dataService.getAllUsers(function(response){
            $scope.users = response;
            console.log('users')
            console.log($scope.users);

        });


        $scope.deleteUser = function(index){

            var deleted = $scope.users.splice(index,1);

         //dataService.removeUser(deleted._id, function(res){
         //       console.log(res);
         //   }
            //TODO send 'deleted' to the server to delete.

        };

    }

})();