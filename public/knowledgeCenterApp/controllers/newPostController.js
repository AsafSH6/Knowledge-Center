(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('NewPostCtrl', NewPostCtrl)

    NewPostCtrl.$inject = ['$window', '$scope', '$location', '$stateParams', 'APIService'];

    /* @ngInject */
    function NewPostCtrl($window, $scope, $location, $stateParams, APIService) {
        var vm = $scope

        vm.activate = activate


        activate();

        ////////////////

        function activate() {
            vm.postPreviewElement = angular.element('#new-post-preview')
            enableTab()
            vm.category = $stateParams.category
            vm.submitNewPost = submitNewPost
            vm.displayPreview = displayPreview
            vm.prewiew = false
        }

        function submitNewPost() {
            APIService.createNewPost(vm.category, null, vm.title, vm.text, function(post) {
                $location.path('post/' + post._id)
            })
        }

        function displayPreview() {
            vm.postPreviewElement.empty()
            parseText(vm.text)
        }

        function parseText(text) {
            var splitedTextByBeginningCodeAreas = text.split('<code ')
            var beginningText = splitedTextByBeginningCodeAreas[0]
            vm.postPreviewElement.append('<p>' + markLinks(beginningText) + '</p>')
            if(splitedTextByBeginningCodeAreas.length == 1) {
                return
            }
            var splitedTextByAfterCodeAreas = splitedTextByBeginningCodeAreas[1].split('</code>')
            var programmingLanguage = splitedTextByAfterCodeAreas[0].split('>', 1)[0]
            var programmingCode = splitedTextByAfterCodeAreas[0].replace(programmingLanguage + '>', "").slice(1, -1)
            var beginningOfNextText = splitedTextByAfterCodeAreas.slice(1, splitedTextByAfterCodeAreas.length).join("")
            var endingOfNextText = splitedTextByBeginningCodeAreas.slice(2, splitedTextByBeginningCodeAreas.length).join("")
            var middleOfNextText = (endingOfNextText.indexOf('</code>') != -1 ? '<code ' : '')
            var fullNextText = beginningOfNextText + middleOfNextText + endingOfNextText

            //console.log('beginning text: \n' + beginningText)
            //console.log('program language: \n' + programmingLanguage)
            //console.log('program code: \n' + programmingCode)
            var editor = 'editor' + vm.codesCounter
            vm.postPreviewElement.append('<div id="' + editor + '-pane" class="editor"><div id="' + editor +'" class="editor"></div></div>')
            $window.codemirror = CodeMirror($('#' + editor).get(0), {
                value: programmingCode,
                mode:  programmingLanguage,
                styleActiveLine: true,
                lineNumbers: true,
                readOnly: true,
            });
            vm.codesCounter += 1
            parseText(fullNextText)
            vm.prewiew = true
            vm.codesCounter = 0
        }

        // TODO: create element </a> and then inject the text
        function markLinks(text) {
            var newText = ''
            while(true) {
                var p = text.split('<link=', 2)
                newText += p[0]
                text = text.replace(p[0], '')
                if(p.length == 1) {
                    break
                }
                var q = p[1].split('>')
                if(q[0].indexOf('http') != -1) {
                    newText += '<a target="_blank" href="' + q[0] + '"' + '>' + q[0] + '</a>'
                }
                else {
                    newText += '<a target="_blank" href="http://' + q[0] + '"' + '>' + q[0] + '</a>'
                }
                text = text.replace('<link=' + q[0] + '>', '')
            }
            return newText
        }

        function enableTab() {
            $(document).delegate('#textbox', 'keydown', function(e) {
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
})();