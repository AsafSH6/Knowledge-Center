/**
 * Created by Eran Reuveni on 13/02/2016.
 */
(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('HomeCtrl', homeCtrl);

    homeCtrl.$inject = ['APIService', "$scope"];

    /* @ngInject */
    function homeCtrl(APIService, $scope) {
        /* jshint validthis: true */

        $scope.postsToDisplay = 3

        APIService.getHomePosts( function(posts) {
            $scope.newPosts = posts;
            console.log($scope.newPosts)
        })

        $scope.listenToNewPosts = function() {
            if(socketIO != undefined) {
                console.log('listening to new posts')
                socketIO.on('new-post', function(newPost) {
                    console.log('new post created')
                    console.log(newPost)
                    $scope.newPosts.unshift(newPost)
                    if($scope.newPosts.length > $scope.postsToDisplay) {
                        $scope.newPosts.pop()
                    }
                    $scope.$apply()
                })
            }
        }
        $scope.listenToNewPosts()

    }
})();