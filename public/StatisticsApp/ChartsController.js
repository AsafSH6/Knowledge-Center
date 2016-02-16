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


        activate()

        function activate() {
            createPie()
            createRadar()
        }
        function createRadar() {
            APIService.getTagsofPost(function (data){

                $scope.barDataLabels=[]
                $scope.barDataValues=[]
                $scope.option = {
                    responsive: true,
                    scaleShowLine: true,
                    angleShowLineOut: true,
                    scaleShowLabels: false,
                    scaleBeginAtZero: true,
                    angleLineColor: 'rgba(0,0,0,.1)',
                    angleLineWidth: 1,
                    pointLabelFontFamily: '"Arial"',
                    pointLabelFontStyle: 'normal',
                    pointLabelFontSize: 10,
                    pointLabelFontColor: '#000',
                    pointDot: true,
                    pointDotRadius: 3,
                    pointDotStrokeWidth: 1,
                    pointHitDetectionRadius: 20,
                    datasetStroke: true,
                    datasetStrokeWidth: 2,
                    datasetFill: true,
                    legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
                }
                for (var tags in data) {
                    $scope.barDataLabels.push(data[tags]._id)
                    $scope.barDataValues.push(data[tags].value.sum)
                }
                var barData= {
                        labels: $scope.barDataLabels,
                        datasets: [
                            {
                                label: "Tags",
                                fillColor: "rgba(150,150,200,0.8)",
                                strokeColor: "rgba(100,200,150,0.8)",
                                highlightFill: "rgba(220,220,220,0.75)",
                                highlightStroke: "rgba(0,0,0,1)",
                                data: $scope.barDataValues
                            }
                        ]
                    }
                    var radar = document.getElementById("pie").getContext("2d");
                    console.log(radar)
                    new Chart(radar).Bar(barData, $scope.option)



                }
            )
        }

        function createPie() {
            APIService.getNumberOfPostGroupedByCategory(function (data) {
                vm.pieData = []
                for (var category in data) {
                    vm.pieData.push({
                        label: data[category]._id,
                        value: data[category].count,
                        color: getRandomColor()
                    })
                }
                var pieOptions = {
                    segmentShowStroke: false,
                    animateScale: true
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