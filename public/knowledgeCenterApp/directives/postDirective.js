(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .directive('postDirective', postDirective);

    postDirective.$inject = ['$window'];


    function postDirective($window) {

        return {
            restrict: 'E',
            template:
                '<p id="post-text" class="text-light fs-mini m text"></p>',
            link: function ( $scope, $element ) {
                function render() {
                    $scope.beginningCodeTag = '<code '
                    $scope.closingCodeTag = '</code>'
                    if($scope.post == null)
                    $scope.loadPost(function() {
                        parseText($scope.post.text, $element)
                    })
                    else {
                        parseText($scope.post.text, $element)
                    }
                }

                render()

                function parseText(text, element) {
                    var splitedTextByBeginningCodeAreas = text.split($scope.beginningCodeTag)
                    var beginningText = splitedTextByBeginningCodeAreas[0]
                    markLinks(beginningText, element)
                    if(splitedTextByBeginningCodeAreas.length == 1) {
                        return
                    }
                    var splitedTextByAfterCodeAreas = splitedTextByBeginningCodeAreas[1].split($scope.closingCodeTag)
                    var programmingLanguage = splitedTextByAfterCodeAreas[0].split('>', 1)[0]
                    var programmingCode = splitedTextByAfterCodeAreas[0].replace(programmingLanguage + '>', "").slice(1, -1)

                    var editor = 'editor' + $scope.codesCounter
                    $scope.increaseCodeCounter()
                    element.append('<div id="' + editor + '-pane" class="editor"><div id="' + editor +'" class="editor"></div></div>')
                    $window.codemirror = CodeMirror($('#' + editor).get(0), {
                        value: programmingCode,
                        mode:  programmingLanguage,
                        styleActiveLine: true,
                        lineNumbers: true,
                        readOnly: true,
                    });
                    var indexOfNextText = text.indexOf($scope.closingCodeTag) + $scope.closingCodeTag.length
                    parseText(text.slice(indexOfNextText, text.length), element)
                }

                function markLinks(text, element) {
                    var newText = ''
                    var newElement = $('<p class="text"></p>').appendTo(element)

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
            }
        };
    }
})();