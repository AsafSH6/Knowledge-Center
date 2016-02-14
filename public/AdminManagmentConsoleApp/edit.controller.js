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

        $scope.user.name = user.name.first;
        $scope.user.email = user.email;
        $scope.user.password = user.password;
        $scope.user.picture = user.picture;

        $scope.update = function(user){

            //$scope.user = user;
            $location.path('users');
            //TODO send the updated user to the server.
        }







    }

})();