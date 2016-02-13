/**
 * Created by Asaf on 12/30/2015.
 */
(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('AuthenticationCtrl', AuthenticationCtrl);

    AuthenticationCtrl.$inject = ['AuthenticationService'];

    /* @ngInject */
    function AuthenticationCtrl(AuthenticationService)
    {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'authenticationController.controller';

        activate();

        ////////////////

        function activate() {
            vm.signin = signin
            vm.signout = signout
            vm.signup = signup
            vm.authenticationFailed = false;
            vm.signupFailed = false;
        }

        function signin() {
            AuthenticationService.signin(vm.username, vm.password, function (err, response) {
                if(err!= null) {
                    vm.authenticationFailed = true
                }
                else {
                    vm.authenticationFailed = false
                    AuthenticationService.SetCredentials(response.id, vm.username, vm.password);
                    clearDetails()
                }
            });
        }

        function signout() {
            AuthenticationService.signout(function(err, response) {
                if(err!= null) {
                    return
                }
                else {
                    AuthenticationService.ClearCredentials()
                }
            })
        }

        function signup() {
            AuthenticationService.signup(vm.username, vm.password, vm.firstName, vm.lastName, vm.email, function(err, response) {
                if(err!= null) {
                    vm.signupFailed = true
                }
                else {
                    vm.signupFailed = false
                    AuthenticationService.SetCredentials(response.id, vm.username, vm.password);
                    clearDetails()
                }
            })
        }

        function clearDetails() {
            vm.username = null
            vm.password = null
            vm.firstName = null
            vm.lastName = null
            vm.email = null
        }
    }
})();