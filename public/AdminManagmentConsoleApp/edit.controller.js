//This controller is template is admin-edit-user.html, responsible for
// editing a client credentials, {usrname, E-mail}
(function () {
    'use strict';

    angular
        .module('adminConsole')
        .controller('editController', edit);

    edit.$inject = ['$scope', '$stateParams', '$location', 'dataService'];

    /* @ngInject */
    function edit($scope, $stateParams, $location, dataService) {

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
    }

})();