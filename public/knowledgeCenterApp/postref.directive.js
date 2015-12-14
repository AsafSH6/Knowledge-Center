(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .directive('postref', postref);

    /* @ngInject */
    postref.$inject = ['$window', 'dataService'];

    function postref($window, dataService) {


        var updateCurrentPost = function(index) {
            dataService.updateCurrentPost(index);
        }

        var directive = {
            link: link,
            restrict: 'AEC',
            template: '<a ui-sref="post({postId: post._id})" ng-click="updateCurrentPost($index)">{{ post.title }}</a>'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.updateCurrentPost = updateCurrentPost
        }
    }
})();