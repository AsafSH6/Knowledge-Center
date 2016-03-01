(function () {
    'use strict';
// Template: admin-tags.html
// show all the current tags and allows the admin, and only the admin, to add new tags.


angular
    .module('adminConsole')
    .controller('tagsController', tagsCtrl);

    tagsCtrl.$inject = ['$rootScope', '$state', 'dataService',"$scope"];

/* @ngInject */
function tagsCtrl($rootScope, $state,dataService, $scope) {


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
                $scope.tagName = ''
            }
        })

    }

    function isLoggedIn() {
        if(!$rootScope.globals.loggedIn) {
            $state.go('login')
        }
    }
    isLoggedIn()
}
})();