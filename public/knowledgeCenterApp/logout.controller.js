/**
 * Created by Asaf on 28/12/2015.
 */
(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('logoutController', logout);

    logout.$inject = ['$rootScope', 'AuthenticationService'];

    /* @ngInject */
    function logout($rootScope, AuthenticationService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'logout.controller';
        activate();

        ////////////////

        function activate() {
            vm.logout = logout
        }

        function logout() {
            console.log('logout')
            AuthenticationService.Logout(function(err, response) {
                if(err!= null) {
                    console.log('err!=null')
                }
                else {
                    AuthenticationService.ClearCredentials()
                }
            })
        }


    }
})();