/**
 * Created by Eran Reuveni on 13/02/2016.
 */

(function () {
    'use strict';

    angular
        .module('adminConsole')
        .controller('editController', edit);

    edit.$inject = ['$rootScope', '$scope', '$stateParams', '$location', '$state', 'dataService'];

    /* @ngInject */
    function edit($rootScope, $scope, $stateParams, $location, $state, dataService) {

        var user = dataService.getUser($stateParams.userIndex);
        console.log(user);
        $scope.err = false;
        $scope.user = {};
        $scope.user._id = user._id;
        $scope.user.name = user.username;
        $scope.user.email = user.email;
        $scope.user.password = user.password;


        $scope.update = function(user){
            //$scope.user = user;

            dataService.updateUser($scope.user.name, $scope.user.email, $scope.user._id, function(err){
                if(err != 200){
                    $scope.err = true;
                    $scope.errorMessage = "Could not update user"
                }
                else{
                    $location.path('users/');
                }
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