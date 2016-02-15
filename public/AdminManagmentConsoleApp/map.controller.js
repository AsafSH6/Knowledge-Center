/**
 * Created by Eran Reuveni on 14/02/2016.
 */




(function () {
    'use strict';

    angular
        .module('adminConsole')
        .controller('mapController', function ($scope) {
            $scope.coords = {latitude: false, longitude: false}

        });
})()