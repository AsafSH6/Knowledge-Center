/**
 * Created by Eran Reuveni on 13/02/2016.
 */
(function () {
    'use strict';

    angular
        .module('ChartsApp')
        .controller('ChartsCtrl', ChartsController);

    /* @ngInject */
    ChartsController.$inject = ['$scope', 'APIService'];


    function ChartsController($scope, APIService) {
        var vm = $scope
        console.log("eee")

        activate()

        function activate() {
            console.log('activate')
            APIService.getNumberOfPostGroupedByCategory(function(data) {
                console.log('get number...')
                vm.pieData = []
                for(var category in data) {
                    vm.pieData.push({
                        label: data[category]._id,
                        value: data[category].count,
                        color: getRandomColor()
                    })
                }
                var pieOptions = {
                    segmentShowStroke : false,
                    animateScale : true
                }
                var pie = document.getElementById("polar-area").getContext("2d");
                console.log(pie)
                new Chart(pie).Pie(vm.pieData, pieOptions);
            })
        }

        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    }
})();