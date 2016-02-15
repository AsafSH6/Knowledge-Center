/**
 * Created by zivbru on 2/14/2016.
 */
(function () {
    'use strict';

    angular
        .module('ChartsApp')
        .factory('APIService', chartFact);

    chartFact.$inject = ['$http'];

    /* @ngInject */
    function chartFact($http) {

        var service = {
            getNumberOfPostGroupedByCategory: getNumberOfPostGroupedByCategory ,
            getTagsofPost: getTagsofPost
        }

        return service


        function getNumberOfPostGroupedByCategory(callback) {
            $http.get('/api/v1/get-categories-and-number-of-related-posts/').then(function(res) {
                console.log(res)
                callback(res.data)
            })
        }

        function getTagsofPost(callback) {
            $http.get('/api/v1/get-tags-and-number-of-related-posts/').then(function(res) {
                console.log(res)
                callback(res.data)
            })
        }



    }
})();