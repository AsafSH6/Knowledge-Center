(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('postController', post)

    post.$inject = ['$scope', '$stateParams', 'dataService'];

    /* @ngInject */
    function post($scope,$stateParams, dataService) {
        var vm = $scope

        vm.activate = activate
        vm.randomBackroundColor = ['bg-warning-light-green',
                                    'bg-warning-light-yellow',
                                    'bg-warning-light-blue',
                                    'bg-warning-light-red',
                                    'bg-warning-blue']


        activate();

        ////////////////

        function activate() {
            console.log('post')
            vm.post = dataService.getCurrentPost()
            if(vm.post == null) {
                console.log('vm.post is null')
                console.log($stateParams.postId)
                dataService.getPostById($stateParams.postId, function(post) {
                    vm.post = post.data
                })
            }
            vm.randomColor = getRandomColor()
        }


        function getRandomColor() {
            return vm.randomBackroundColor[Math.floor((Math.random() * vm.randomBackroundColor.length))]
        }
    }
})();