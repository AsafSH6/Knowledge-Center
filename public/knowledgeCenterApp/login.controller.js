(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('loginController', login);

    login.$inject = ['$rootScope', 'AuthenticationService'];

    /* @ngInject */
    function login($rootScope, AuthenticationService)
    {
        /* jshint validthis: true */
        var vm = this;
        vm.login = login

        vm.activate = activate;
        vm.title = 'login.controller';
        vm.authenticationFailed = false;

        activate();

        ////////////////

        function activate() {
        }

        function login() {
            AuthenticationService.Login(vm.username, vm.password, function (err, response) {
                console.log('at login')
                if(err!= null) {
                    console.log('err!=null')
                    vm.authenticationFailed = true
                }
                else {
                    console.log('auth successed')
                    vm.authenticationFailed = false
                    AuthenticationService.SetCredentials(response.id, vm.username, vm.password);

                }
            });
        };
    }
})();