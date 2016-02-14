/**
 * Created by Eran Reuveni on 14/02/2016.
 */
(function () {
    'use strict';
angular
    .module('adminConsole')
    .controller('homeController', 'homeCtrl');

homeCtrl.$inject = ['$scope', 'dataService'];

/* @ngInject */
function homeCtrl($scope, dataService) {

}

})();