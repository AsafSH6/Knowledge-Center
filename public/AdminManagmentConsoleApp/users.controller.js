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
            vm.users = response;
            $('#loader').hide();
            $('#userList').show();
        });


        $scope.showDetail = function (u) {
            $scope.active = u.username;
        };
    }
})();