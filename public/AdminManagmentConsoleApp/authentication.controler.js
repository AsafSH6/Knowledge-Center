(function () {
    'use strict';

    angular
        .module('adminConsole')
        .controller('authenticationCtrl', AuthenticationCtrl);

    AuthenticationCtrl.$inject = ['$rootScope', '$state', '$location', 'AuthenticationService'];

    /* @ngInject */
    function AuthenticationCtrl($rootScope, $state, $location, AuthenticationService)
    {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'authenticationController.controller';

        activate();

        ////////////////

        function activate() {
            vm.signin = signin;
            vm.signout = signout;
            vm.authenticationFailed = false;
            vm.signupFailed = false;
            vm.loggedAsAdmin = false;
        }

        function signin() {
            console.log(vm.username)
            console.log(vm.password)
            AuthenticationService.signin(vm.username, vm.password, function (err, response) {
                console.log(err)
                if(err!= null) {
                    vm.authenticationFailed = true
                    vm.loggedAsAdmin = false
                }
                else {
                    vm.loggedAsAdmin = true
                    vm.authenticationFailed = false
                    AuthenticationService.SetCredentials(response.id, vm.username, vm.password);
                    clearDetails()
                    $location.path('home/')
                }
            });
        }

        function signout() {
            AuthenticationService.signout(function(err, response) {
                if(err!= null) {
                    return
                }
                else {
                    $location.path('/');
                    AuthenticationService.ClearCredentials()
                }
            })
        }


        function clearDetails() {
            vm.username = null
            vm.password = null

        }

        function isLoggedIn() {
            if($rootScope.globals.loggedIn) {
                $state.go('home')
            }
        }
        isLoggedIn()
    }
})();