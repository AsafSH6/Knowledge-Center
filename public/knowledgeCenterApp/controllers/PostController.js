(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('PostCtrl', PostCtrl)

    PostCtrl.$inject = ['$window', '$rootScope', '$scope', '$stateParams', '$compile', 'APIService'];

    /* @ngInject */
    function PostCtrl($window, $rootScope, $scope, $stateParams, $compile, APIService) {
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
            if(vm.post != null) {
                vm.isPostPublisher = isPostPublisher
                vm.isCommentPublisher = isCommentPublisher
                vm.changeSolvedStatus = changeSolvedStatus
                vm.addEditModeFalseToComment = addEditModeFalseToComment
                vm.updateComment = updateComment
                vm.edit = edit
            }
            vm.randomColor = getRandomColor()
            vm.codesCounter = 0
            vm.loadPost = loadPost
            vm.increaseCodeCounter = increaseCodeCounter
            vm.submitNewComment = submitNewComment
            enableTab()
            activeToolTip()

            function getRandomColor() {
                return vm.randomBackroundColor[Math.floor((Math.random() * vm.randomBackroundColor.length))]
            }

            function submitNewComment(text) {
                console.log(text)
                APIService.createNewComment(vm.post._id, text, function (comment) {
                    if (text != undefined) {
                        vm.post.comments.push(comment)
                    }
                })
            }

            function deletePost() {
                APIService.deletePost(vm.post._id, function() {

                })
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

            function updateComment($index) {
                if(vm.post.comments[$index].editedText != undefined) {
                    vm.post.comments[$index].text = vm.post.comments[$index].editedText
                    APIService.updateComment(vm.post.comments[$index], function () {
                        vm.post.comments[$index].editMode = false
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
                    vm.post = post.data
                    vm.isPostPublisher = isPostPublisher
                    vm.isCommentPublisher = isCommentPublisher
                    vm.changeSolvedStatus = changeSolvedStatus
                    vm.addEditModeFalseToComment = addEditModeFalseToComment
                    vm.updateComment = updateComment
                    vm.edit = edit
                    callback()
                })
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
        }
    }
})();