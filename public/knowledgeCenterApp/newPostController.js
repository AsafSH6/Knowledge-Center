(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('newPostController', post)

    post.$inject = ['$scope', '$stateParams', 'dataService'];

    /* @ngInject */
    function post($scope,$stateParams, dataService) {
        var vm = $scope

        vm.activate = activate


        activate();

        ////////////////

        function activate() {
            vm.category = $stateParams.category
            console.log('create new post category: ' + vm.category)
        }
    }
})();