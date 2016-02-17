(function () {
    'use strict';
    angular
        .module('adminConsole')
        .controller('homeController', ['$rootScope', '$state','$scope', function ($rootScope, $state, $scope) {
            function isLoggedIn() {
                if(!$rootScope.globals.loggedIn) {
                    $state.go('login')
                }
            }
            isLoggedIn()
        }]);
})();

