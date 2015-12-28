/**
 * Created by Asaf on 28/12/2015.
 */
(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('signupController', signup);

    signup.$inject = ['$rootScope', 'AuthenticationService'];

    /* @ngInject */
    function signup($rootScope, AuthenticationService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'signup.controller';
        vm.signupFailed = false;
        vm.signedup = false;
        activate();

        ////////////////

        function activate() {
            vm.signup = signup
        }

        function signup() {
            console.log('singup')
            AuthenticationService.Signup(vm.username, vm.password, vm.firstName, vm.lastName, vm.email, function(err, response) {
                if(err!= null) {
                    console.log('err!=null')
                    vm.signupFailed = true
                    vm.signedup = false
                }
                else {
                    console.log('signup successed')
                    vm.signupFailed = false
                    vm.signedup = true
                    AuthenticationService.SetCredentials(response.id, vm.username, vm.password);
                }
            })
        }


    }
})();