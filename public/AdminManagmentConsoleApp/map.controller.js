// this controller template is admin-map.html.
// uses ngMap for presenting the google map.
// fetch all the clients addresses from the server and gives the admin
// a list of all the clients where he can choose a relevant client
// and the map focuses to the relevant location
(function () {
    'use strict';

    angular
        .module('adminConsole')
        .controller('mapController', mapController);

    mapController.$inject = ['$rootScope', '$state', '$scope','dataService','NgMap'];

    /* @ngInject */
    function mapController($rootScope, $state, $scope, dataService,NgMap) {

        $scope.address = "Rishon Letzion Israel";

        $scope.addresses = null;

        dataService.getAllAddresses(function(addr){
            console.log(addr);
            $scope.addresses = addr;
            $scope.changeLocation = function(index){
                console.log('change location func')
                $scope.address = $scope.addresses[index].city_addr+" " + $scope.addresses[index].street_addr + " israel";
                console.log($scope.address)
            }
        })


            NgMap.getMap().then(function(map) {
                console.log(map.getCenter());
                console.log('markers', map.markers);
                console.log('shapes', map.shapes);
            });

        function isLoggedIn() {
            if(!$rootScope.globals.loggedIn) {
                $state.go('login')
            }
        }
        isLoggedIn()




    //    var vm=this;
    //    NgMap.getMap().then(function(map) {
    //        vm.map = map;
    //    });
    //
    //    vm.neighborhoods = [
    //        new google.maps.LatLng(52.511467, 13.447179),
    //        new google.maps.LatLng(52.549061, 13.422975),
    //        new google.maps.LatLng(52.497622, 13.396110),
    //        new google.maps.LatLng(52.517683, 13.394393)
    //    ];
    //
    //    vm.toggleBounce = function() {
    //        if (this.getAnimation() != null) {
    //            this.setAnimation(null);
    //        } else {
    //            this.setAnimation(google.maps.Animation.BOUNCE);
    //        }
    //    };
    //
    //    var iterator=0;
    //    vm.addMarker = function() {
    //        for (var i=0; i<vm.neighborhoods.length; i++) {
    //            $timeout(function() {
    //                // add a marker this way does not sync. marker with <marker> tag
    //                new google.maps.Marker({
    //                    position: vm.neighborhoods[iterator++],
    //                    map: vm.map,
    //                    draggable: false,
    //                    animation: google.maps.Animation.DROP
    //                });
    //            }, i * 200);
    //        }
    //    }
    }



    //$http, $interval, NgMap) {
        //    var vm = this;
        //    vm.positions = [
        //        [54.779951, 9.334164], [47.209613, 15.991539],
        //        [51.975343, 7.596731], [51.97539, 7.596962],
        //        [47.414847, 8.23485], [47.658028, 9.159596],
        //        [47.525927, 7.68761], [50.85558, 9.704403],
        //        [54.320664, 10.285977], [49.214374, 6.97506],
        //        [52.975556, 7.596811], [52.975556, 7.596811],
        //        [52.975556, 7.596811], [52.975556, 7.596811],
        //        [52.975556, 7.596811], [52.975556, 7.596811],
        //        [52.975556, 7.596811], [52.975556, 7.596811],
        //        [52.975556, 7.596811], [52.975556, 7.596811]];
        //
        //    vm.dynMarkers = []
        //    NgMap.getMap().then(function(map) {
        //        var bounds = new google.maps.LatLngBounds();
        //        for (var k in map.customMarkers) {
        //            var cm = map.customMarkers[k];
        //            vm.dynMarkers.push(cm);
        //            bounds.extend(cm.getPosition());
        //        };
        //
        //        vm.markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {});
        //        map.setCenter(bounds.getCenter());
        //        map.fitBounds(bounds);
        //    });
        //});
})()