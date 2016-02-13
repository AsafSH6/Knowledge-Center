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

        var vm = $scope;

        dataService.getAllUsers(function(response){
            vm.users = response.results;
            $('#loader').hide();
            $('#userList').show();
        });


        $scope.deleteUser = function(index){

            var deleted = $scope.users.splice(index,1);

            //TODO send 'deleted' to the server to delete.

        };





    }

})();