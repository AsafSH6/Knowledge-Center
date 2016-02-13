(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .directive('tagsDirective', tagsDirective);

    function tagsDirective() {

        return {
            restrict: 'E',
            template:
            '<input type="text" class="form-control input-text" placeholder="Add a tag..." ng-model="new_value" ' +
            'uib-typeahead="tag.name for tag in dbTags | filter:$viewValue | limitTo:5"' +
            'typeahead-select-on-blur="true"' +
            'typeahead-on-select=add()>' +
            '<div class="tags-directive">' +
                '<a href="" ng-repeat="(idx, tag) in chosenTags" class="tag" ng-click="remove(idx)">{{ tag }} </a>' +
            '</div>',
            link: function ( $scope ) {

                // This adds the new tag to the tags array
                $scope.add = function() {
                    if($scope.chosenTags.indexOf($scope.new_value) == -1) {
                        $scope.chosenTags.push($scope.new_value);
                    }
                    $scope.new_value = "";
                };

                // This is the ng-click handler to remove an item
                $scope.remove = function ( idx ) {
                    $scope.chosenTags.splice( idx, 1 );
                };

            }
        };
    }
})();