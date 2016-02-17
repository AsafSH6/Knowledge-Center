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
            for(var user in $scope.users) {
                $scope.users[user].connected = false
            }
            connectedUsersSocketIO()
            disconnectedUsersSocketIO()
            console.log('users')
            console.log($scope.users);
        });

        function connectedUsersSocketIO() {
            if(socketIO != undefined) {
                socketIO.on('user-connected', function(userId) {
                    if($scope.users != undefined) {
                        for(var user in $scope.users) {
                            if($scope.users[user]._id == userId) {
                                $scope.users[user].connected = true
                                $scope.$apply()
                                return
                            }
                        }
                    }
                })
            }
        }

        function disconnectedUsersSocketIO() {
            if(socketIO != undefined) {
                socketIO.on('user-disconnected', function(userId) {
                    if($scope.users != undefined) {
                        for(var user in $scope.users) {
                            if($scope.users[user]._id == userId) {
                                $scope.users[user].connected = false
                                $scope.$apply()
                                return
                            }
                        }
                    }
                })
            }
        }

    }

})();