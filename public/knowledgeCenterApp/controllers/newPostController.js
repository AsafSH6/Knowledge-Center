(function () {
    'use strict';
    // Template: createPost.
    // This controller gets all the details fora new post
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
            vm.category = $stateParams.category
            APIService.getAllTags(function(tags) {
                vm.dbTags = tags
                vm.chosenTags = []
                vm.editMode = false
                vm.text = ''
                if($stateParams.originalPostId != null) {
                    vm.editMode = true
                    vm.post = APIService.getCurrentPost()
                    vm.text = vm.post.text
                    vm.title = vm.post.title
                    vm.chosenTags = []
                    for(var tag in vm.post.tags) {
                        vm.chosenTags.push(vm.post.tags[tag].name)
                    }
                }
            })

            enableTab()
            vm.submitNewPost = submitNewPost
            vm.displayPreview = displayPreview
            vm.addCode = addCode
            vm.beginningCodeTag = '<code '
            vm.closingCodeTag = '</code>'
            vm.prewiew = false
            vm.supportedLanguages = {
                'Python': 'python',
                'Java Script': 'javascript',
                'Java': 'text/x-java',
                'Scala': 'text/x-scala',
                'C': 'text/x-csrc',
                'C++': 'text/x-c++src',
                'C#': 'text/x-csharp',
                'Objective-C': 'text/x-objectivec ',
                'GO':'go',
                'Groovy': 'groovy',
                'Perl': 'perl',
                'PHP': 'php',
                'Ruby': 'ruby',
                'Swift': 'swift',
                'SQL SERVER': 'text/x-sql',
                'MYSQL': 'text/x-mysql',
                'SHELL': 'shell',
                'Pig': 'pig',
                'HTML': 'xml',
                'XML': 'xml',
                'CSS': 'css',
                'HTTP': 'http',
                'NGINX': 'nginx'
            }

        }

        function submitNewPost() {
            if (!vm.editMode) {
                APIService.createNewPost(vm.category, vm.chosenTags, vm.title, vm.text, function (post) {
                    $location.path('post/' + post._id)
                })
            }
            else {
                vm.post.text = vm.text
                vm.post.title = vm.title
                vm.post.tags = vm.chosenTags
                APIService.updatePost(vm.post, function () {
                    $location.path('post/' + vm.post._id)
                })
            }
        }

        function displayPreview() {
            vm.postPreviewElement.empty()
            vm.codesCounter = 0
            parseText(vm.text)
            vm.prewiew = true
        }

        function addCode(language) {
            if(vm.text == undefined)
                vm.text = ''
            else if(vm.text.length > 0)
                vm.text += '\n'
            vm.text += '<code ' + language + '>\n\n</code>\n'
        }

        function parseText(text) {
            var splitedTextByBeginningCodeAreas = text.split(vm.beginningCodeTag)
            var beginningText = splitedTextByBeginningCodeAreas[0]
            markLinks(beginningText, vm.postPreviewElement)
            if(splitedTextByBeginningCodeAreas.length == 1) {
                return
            }
            var splitedTextByAfterCodeAreas = splitedTextByBeginningCodeAreas[1].split(vm.closingCodeTag)
            var programmingLanguage = splitedTextByAfterCodeAreas[0].split('>', 1)[0]
            var programmingCode = splitedTextByAfterCodeAreas[0].replace(programmingLanguage + '>', "").slice(1, -1)

            var editor = 'editor' + vm.codesCounter
            vm.postPreviewElement.append('<div id="' + editor + '-pane" class="editor"><div id="' + editor +'" class="editor"></div></div>')
            $window.codemirror = CodeMirror($('#' + editor).get(0), {
                value: programmingCode,
                mode: programmingLanguage,
                styleActiveLine: true,
                lineNumbers: true,
                readOnly: true,
            });
            vm.codesCounter += 1
            var indexOfNextText = text.indexOf(vm.closingCodeTag) + vm.closingCodeTag.length

            parseText(text.slice(indexOfNextText, text.length))
        }

        function markLinks(text, element) {
            var newText = ''
            var newElement = $('<p></p>').appendTo(element)

            while(true) {
                var p = text.split('<link=', 2)
                var textBeforeLink =  p[0]
                var spanWithText = $('<span></span>').text(textBeforeLink)
                newElement.append(spanWithText)
                text = text.replace(textBeforeLink, '')
                if(p.length == 1) { break }

                var linkURL = p[1].split('>')[0]
                var aTagWithHref = $('<a target="_blank"></a>').text(linkURL)

                if(linkURL.indexOf('http') != -1) { aTagWithHref.attr('href', linkURL) }
                else { aTagWithHref.attr('href', 'http://' + linkURL) }

                newElement.append(aTagWithHref)
                text = text.replace('<link=' + linkURL + '>', '')
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