//HomeController template: home.html
// Get all the latest posts.
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

        function listenToNewPosts() {
            //if(socketIO != undefined) {
            //    console.log('listening to new posts')
            //    socketIO.on('new-post', function(newPost) {
            //        console.log('new post created')
            //        console.log(newPost)
            //        $scope.newPosts.unshift(newPost)
            //        if($scope.newPosts.length > $scope.postsToDisplay) {
            //            $scope.newPosts.pop()
            //        }
            //        $scope.$apply()
            //    })
            //}
        }
        listenToNewPosts()

        function videoModal() {
            $(document).ready(function(){
                /* Get iframe src attribute value i.e. YouTube video url
                 and store it in a variable */
                $("#angularImg").click(function(){
                    console.log('modal')
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