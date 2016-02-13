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
            createNewPost: createNewPost,
            getAllNewPosts: getAllNewPosts,
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
        function getAllNewPosts(callback) {
            $http.get('./api/v1/get-all-new-posts').then(function(posts) {

                callback(posts);
            });

        }
    function getAllPostsFilteredByCategory(category, callback) {
        $http.get('./api/v1/get-all-posts-filtered-by-category/' + category).then(function(posts) {
            dbPosts = posts.data;
            callback(posts);
        });
    }
    function getPostById(postId, callback) {
        $http.get('./api/v1/get-post-by-id/' + postId).then(function(post) {
            console.log(post.data);
            callback(post)
        })
    }
    function IncreaseViewByOne(postId) {
        $http.get('./api/v1/increase-view-by-one/' + postId)
    }
    function createNewPost(category, tags, title, text, callback) {
        $http.post('./api/v1/create-new-post/', {category: category, tags: tags, title: title, text: text}).then(function(res) {
            console.log(res);
            callback(res.data)
        })
    }
    function updateCurrentPost(index) {
        currentPost = dbPosts[index]
        IncreaseViewByOne(currentPost._id);
        console.log(currentPost)
    }
    function getCurrentPost() {
        return currentPost;
    }
}
})
();