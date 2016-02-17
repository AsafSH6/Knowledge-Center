//Template: admin-users.html
// Manages all the users, also uses socket.io to present all the connected users.
(function () {
    'use strict';

    angular
        .module('adminConsole')
        .controller('usersController', adminPosts);

    adminPosts.$inject = ['$rootScope', '$state', 'dataService', "$scope"];

    /* @ngInject */
    function adminPosts($rootScope, $state,dataService, $scope) {



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

        function isLoggedIn() {
            console.log('is logged in')
            if(!$rootScope.globals.loggedIn) {
                console.log('moving to log in')
                $state.go('login')
            }
        }
        isLoggedIn()

    }

})();