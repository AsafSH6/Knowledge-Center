/**
 * Created by Eran Reuveni on 13/02/2016.
 */

(function () {
    'use strict';

    angular
        .module('adminConsole')
        .controller('editController', edit);

    edit.$inject = ['$scope', '$stateParams', '$location', 'dataService'];

    /* @ngInject */
    function edit($scope, $stateParams, $location, dataService) {

        var users = dataService.users;

        var user = users.splice($stateParams,1);
        $scope.err = false;
        $scope.user.name = user.username;
        $scope.user.email = user.email;
        $scope.user.password = user.password;


        $scope.update = function(user){
            //$scope.user = user;

            dataService.updatUser(user.username, user.password, user.email, function(err){
                if(err != 200){
                    $scope.err = true;
                    $scope.errorMessage = "Could not update user"
                }
                else{
                    $location.path('users/');
                }
            })
        }







    }

})();