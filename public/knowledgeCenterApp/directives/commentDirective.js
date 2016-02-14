(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .directive('commentDirective', commentDirective);

    commentDirective.$inject = ['$window'];


    function commentDirective($window) {

        return {
            restrict: 'E',
            template:
            '<p></p>',
            link: function ( $scope, $element ) {
                $scope.addEditModeFalseToComment($scope.comment)
                function render() {
                    parseText($scope.comment.text, $element)
                }
                render()
                function parseText(text, element) {
                    var splitedTextByBeginningCodeAreas = text.split('<code ')
                    var beginningText = splitedTextByBeginningCodeAreas[0]
                    markLinks(beginningText, element)
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
                    parseText(fullNextText, element)
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