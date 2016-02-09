(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .controller('postController', post)

    post.$inject = ['$window', '$scope', '$stateParams', 'dataService'];

    /* @ngInject */
    function post($window, $scope,$stateParams, dataService) {
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
            vm.postElement = angular.element('#post-text')
            vm.codesCounter = 0
            vm.post = dataService.getCurrentPost()
            if(vm.post == null) {
                console.log('vm.post is null')
                console.log($stateParams.postId)
                dataService.getPostById($stateParams.postId, function(post) {
                    vm.post = post.data
                    console.log('displaying post: ')
                    console.log(vm.post)
                    parseText(vm.post.text)
                })
            }
            else {
                console.log('displaying post: ')
                console.log(vm.post)
                parseText(vm.post.text)
            }
            vm.randomColor = getRandomColor()
        }


        function getRandomColor() {
            return vm.randomBackroundColor[Math.floor((Math.random() * vm.randomBackroundColor.length))]
        }

        function parseText(text) {
            var splitedTextByBeginningCodeAreas = text.split('<code ')
            var beginningText = splitedTextByBeginningCodeAreas[0]
            vm.postElement.append('<p>' + markLinks(beginningText) + '</p>')
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
            vm.postElement.append('<div id="' + editor + '-pane" class="editor"><div id="' + editor +'" class="editor"></div></div>')
            $window.codemirror = CodeMirror($('#' + editor).get(0), {
                value: programmingCode,
                mode:  programmingLanguage,
                styleActiveLine: true,
                lineNumbers: true,
                readOnly: true,
            });
            vm.codesCounter += 1
            parseText(fullNextText)
        }

        function markLinks(text) {
            var newText = ''
            while(true) {
                var p = text.split('<link=', 2)
                newText += p[0]
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
    }
})();