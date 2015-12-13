(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('login', login);

    login.$inject = ['$location', 'AuthenticationService'];

    /* @ngInject */
    function login($location, AuthenticationService)
    {
        /* jshint validthis: true */
        var vm = this;
        vm.login = login

        vm.activate = activate;
        vm.title = 'login.controller';

        activate();

        ////////////////

        function activate() {
            AuthenticationService.ClearCredentials()
        }

        function login() {
            console.log(vm.username)
            console.log(vm.password)
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.status == 200) {
                    AuthenticationService.SetCredentials(response.id, vm.username, vm.password);
                    $location.path('/');
                } else {
                    console.log(response.status)
                    console.log('failed')
                }
            });
        };
    }
})();