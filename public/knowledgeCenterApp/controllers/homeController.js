//HomeController template: home.html
// Get all the latest posts.
(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('HomeCtrl', homeCtrl);

    homeCtrl.$inject = ['APIService', '$scope', '$state'];

    /* @ngInject */
    function homeCtrl(APIService, $scope, $state) {
        /* jshint validthis: true */

        $scope.postsToDisplay = 3

        APIService.getHomePosts( function(posts) {
            $scope.newPosts = posts;
        })

        $scope.searchByTag = function(tag) {
            APIService.search({category: '', tag: tag, text: ''}, function(posts) {
                $state.go('posts', {category: 'Search', posts: posts})
            })
        }

        function listenToNewPosts() {
            if(socketIO != undefined) {
                socketIO.on('new-post', function(newPost) {
                    $scope.newPosts.unshift(newPost)
                    if($scope.newPosts.length > $scope.postsToDisplay) {
                        $scope.newPosts.pop()
                    }
                    $scope.$apply()
                })
            }
        }
        listenToNewPosts()

        function videoModal() {
            $(document).ready(function(){
                /* Get iframe src attribute value i.e. YouTube video url
                 and store it in a variable */
                $("#angularImg").click(function(){
                    $("#myModal2").modal();
                });
                //var url = "http://techslides.com/demos/sample-videos/small.mp4";
                var url = "/videos/LearnAngularBasics.mp4";

                /* Assign empty url value to the iframe src attribute when
                 modal hide, which stop the video playing */
                $("#myModal2").on('hide.bs.modal', function(){
                    $("#cartoonVideo").attr('src', '');
                });

                /* Assign the initially stored url back to the iframe src
                 attribute when modal is displayed again */
                $("#myModal2").on('show.bs.modal', function(){
                    $("#cartoonVideo").attr('src', url);
                });
            });
        }
        videoModal()

    }
})();