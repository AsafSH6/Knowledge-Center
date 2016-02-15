(function () {
    'use strict';

angular
    .module('adminConsole')
    .controller('tagsController', tagsCtrl);

    tagsCtrl.$inject = ['dataService',"$scope"];

/* @ngInject */
function tagsCtrl(dataService, $scope) {


    dataService.getAllTags(function (tags) {
        $scope.tags = tags;
        console.log("tags");
        console.log($scope.tags);
    });



    $scope.removeTag = function(tagIndex){

        var tagId = $scope.tags[tagIndex]._id;
        dataService.removeTag(tagId, function(status){

            if(status == 200){
                $scope.tags.splice(tagIndex,1);
            }
        })

    }

    $scope.addTag = function(tagName){


        dataService.addTag(tagName, function(err, tag){

            if(!err){
                $scope.tags.push(tag);
            }
        })

    }
}
})();