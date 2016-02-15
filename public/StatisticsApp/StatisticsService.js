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
        var posts = null
        var dbCategories = null

        var service = {
            getNumberOfPostGroupedByCategory: getNumberOfPostGroupedByCategory
        }

        return service

        function getNumberOfPostGroupedByCategory(callback) {
            $http.get('/api/v1/get-categories-and-number-of-related-posts/').then(function(res) {
                console.log(res)
                callback(res.data)
            })
        }

    }
})();