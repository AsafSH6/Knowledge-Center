(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .factory('knowledgeCenterServiceCtrl', knowledgeCenterServiceCtrl);

    knowledgeCenterServiceCtrl.$inject = ['$http'];

    /* @ngInject */
    function knowledgeCenterServiceCtrl($http) {
        var service = {
            getAllCategories: getAllCategories,
            getAllPostsFilteredByCategory: getAllPostsFilteredByCategory
        };

    return service;

    ////////////////

    function getAllCategories(callback) {
        $http.get('./api/v1/get-all-categories').then(function(categories) {
            callback(categories);
        });

    }
    function getAllPostsFilteredByCategory(category, callback) {
        $http.get('./api/v1/get-all-posts-filtered-by-category/' + category).then(function(posts) {
            callback(posts);
        });
    }
}
})
();