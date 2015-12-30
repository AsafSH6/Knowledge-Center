/**
 * Created by Asaf on 12/30/2015.
 */
(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('authenticationController', authenticationController);

    authenticationController.$inject = ['$rootScope', 'AuthenticationService'];

    /* @ngInject */
    function authenticationController($rootScope, AuthenticationService)
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
                console.log('at signin')
                if(err!= null) {
                    console.log('err!=null')
                    vm.authenticationFailed = true
                }
                else {
                    console.log('auth successed')
                    vm.authenticationFailed = false
                    AuthenticationService.SetCredentials(response.id, vm.username, vm.password);
                    clearDetails()
                }
            });
        }

        function signout() {
            console.log('signout')
            AuthenticationService.signout(function(err, response) {
                if(err!= null) {
                    console.log('err!=null')
                }
                else {
                    AuthenticationService.ClearCredentials()
                }
            })
        }

        function signup() {
            console.log('singup')
            AuthenticationService.signup(vm.username, vm.password, vm.firstName, vm.lastName, vm.email, function(err, response) {
                if(err!= null) {
                    console.log('err!=null')
                    vm.signupFailed = true
                }
                else {
                    console.log('signup succeeded')
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