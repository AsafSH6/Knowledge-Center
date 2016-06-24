(function () {
    'use strict';
//Template: post.html.
// Shows the current post that the user clicked on.
    angular
        .module('KnowledgeCenter')
        .controller('PostCtrl', PostCtrl)

    PostCtrl.$inject = ['$timeout', '$window', '$rootScope', '$scope', '$stateParams', '$state', '$location', 'APIService'];

    /* @ngInject */
    function PostCtrl($timeout, $window, $rootScope, $scope, $stateParams, $state, $location, APIService) {
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
            vm.post = APIService.getCurrentPost()
            if(vm.post != null && vm.post._id == $stateParams.postId) {
                setPostFunctionsInScope()
                socketIOListenToNewComments()
            }
            vm.loadPost = loadPost
            vm.randomColor = getRandomColor()
            vm.codesCounter = 0
            vm.increaseCodeCounter = increaseCodeCounter
            vm.submitNewComment = submitNewComment
            enableTab()
            activeToolTip()
        }

        function getRandomColor() {
            return vm.randomBackroundColor[Math.floor((Math.random() * vm.randomBackroundColor.length))]
        }

        function submitNewComment(text) {
            APIService.createNewComment(vm.post._id, text, function () {})
        }

        function deletePost() {
            APIService.deletePost(vm.post._id, function() {
                $location.path(vm.post.category.name)
            })
        }

        function deleteComment($index) {
            APIService.deleteComment(vm.post.comments[$index]._id, vm.post._id, function() {})
        }

        function increaseCodeCounter() {
            vm.codesCounter += 1
        }

        function isPostPublisher() {
            if($rootScope.globals.loggedIn) {
                if($rootScope.globals.currentUser.id == vm.post.user._id) {
                    return true
                }
            }
            return false
        }

        function isCommentPublisher(comment) {
            if($rootScope.globals.loggedIn) {
                if($rootScope.globals.currentUser.id == comment.user._id) {
                    return true
                }
            }
            return false
        }

        function edit(comment) {
            if(comment.editMode == false) {
                comment.editMode = true
                comment.editedText = comment.text
                comment.edit_or_cancel = 'cancel'
            }
            else {
                comment.editMode = false
                comment.edit_or_cancel = 'edit'
            }
        }

        function updateComment(commentId) {
            var comment = vm.post.comments.filter(function(comment){
                return comment._id === commentId
            })[0]
            if(comment.editedText != undefined) {
                comment.text = comment.editedText
                APIService.updateComment(comment, function () {
                    comment.editMode = false
                })
            }
        }

        function activeToolTip() {
            $(document).ready(function() {
                $('[data-toggle="tooltip"]').tooltip()
            })
        }

        function addEditModeFalseToComment(comment) {
            comment.editMode = false
            comment.edit_or_cancel = 'edit'
        }

        function changeSolvedStatus() {
            APIService.changeSolvedStatus(vm.post._id, !vm.post.solved, function (res) {
                vm.post.solved = !vm.post.solved
            })
        }

        function loadPost(callback) {
            APIService.getPostById($stateParams.postId, function (post) {
                vm.post = post
                APIService.updateCurrentPost(vm.post)
                setPostFunctionsInScope()
                socketIOListenToNewComments()
                callback()
            })
        }

        function setPostFunctionsInScope() {
            vm.isPostPublisher = isPostPublisher
            vm.isCommentPublisher = isCommentPublisher
            vm.changeSolvedStatus = changeSolvedStatus
            vm.addEditModeFalseToComment = addEditModeFalseToComment
            vm.updateComment = updateComment
            vm.edit = edit
            vm.deletePost = deletePost
            vm.deleteComment = deleteComment
            vm.searchByTag = searchByTag
        }

        function enableTab() {
            $(document).delegate('#new-comment', 'keydown', function (e) {
                var keyCode = e.keyCode || e.which;

                if (keyCode == 9) {
                    e.preventDefault();
                    var start = $(this).get(0).selectionStart;
                    var end = $(this).get(0).selectionEnd;

                    // set textarea value to: text before caret + tab + text after caret
                    $(this).val($(this).val().substring(0, start)
                        + "\t"
                        + $(this).val().substring(end));

                    // put caret at right position again
                    $(this).get(0).selectionStart =
                        $(this).get(0).selectionEnd = start + 1;
                }
            });
        }

        function searchByTag(tag) {
            APIService.search({category: '', tag: tag, text: ''}, function(posts) {
                $state.go('posts', {category: 'Search', posts: posts})
            })
        }

        function socketIOListenToNewComments() {
            if(socketIO != undefined) {
                socketIO.on(vm.post._id, function(comment) {
                    vm.post.comments.push(comment)
                    vm.$apply()
                })
                socketIO.on('comment-' + vm.post._id, function(commentId) {
                    $timeout(function() {
                        for (var comment in vm.post.comments) {
                            if (vm.post.comments[comment]._id == commentId) {
                                vm.post.comments.splice(comment, 1)
                                break
                            }
                        }
                        for(var comment in vm.post.comments) {
                            vm.post.comments[comment].editMode = true
                        }
                    })
                    $timeout(function() {
                        for(var comment in vm.post.comments) {
                            vm.post.comments[comment].editMode = false
                        }
                    })
                })
            }
        }

    }
})();