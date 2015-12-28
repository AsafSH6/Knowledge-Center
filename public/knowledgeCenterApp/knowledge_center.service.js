(function () {
    'use strict';

    angular
        .module('knowledgeCenter')
        .factory('dataService', knowledgeCenterServiceCtrl);

    knowledgeCenterServiceCtrl.$inject = ['$http'];

    /* @ngInject */
    function knowledgeCenterServiceCtrl($http) {
        var dbPosts = null
        var dbCategories = null
        var currentPost = null
        var service = {
            getAllCategories: getAllCategories,
            getAllPostsFilteredByCategory: getAllPostsFilteredByCategory,
            getPostById: getPostById,
            updateCurrentPost: updateCurrentPost,
            getCurrentPost: getCurrentPost,
            dbPosts: dbPosts,
            dbCategories: dbCategories,
        };

    return service;

    ////////////////

    function getAllCategories(callback) {
        $http.get('./api/v1/get-all-categories').then(function(categories) {
            dbCategories = categories.data
            callback(categories);
        });

    }
    function getAllPostsFilteredByCategory(category, callback) {
        $http.get('./api/v1/get-all-posts-filtered-by-category/' + category).then(function(posts) {
            dbPosts = posts.data
            callback(posts);
        });
    }
    function getPostById(postId, callback) {
        $http.get('./api/v1/get-post-by-id/' + postId).then(function(post) {
            console.log(post.data)
            callback(post)
        })
    }
    function IncreaseViewByOne(postId) {
        $http.get('./api/v1/increase-view-by-one/' + postId)
    }
    function updateCurrentPost(index) {
        currentPost = dbPosts[index]
        IncreaseViewByOne(currentPost._id)
        console.log(currentPost)
    }
    function getCurrentPost() {
        return currentPost
    }
}
})
();