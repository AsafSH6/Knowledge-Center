(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .factory('APIService', APIService);

    APIService.$inject = ['$http'];

    /* @ngInject */
    function APIService($http) {
        var dbPosts = null
        var dbCategories = null
        var currentPost = null
        var service = {
            getAllCategories: getAllCategories,
            getAllPostsFilteredByCategory: getAllPostsFilteredByCategory,
            getAllTagsFilteredByCategory: getAllTagsFilteredByCategory,
            getPostById: getPostById,
            updateCurrentPost: updateCurrentPost,
            getCurrentPost: getCurrentPost,
            createNewPost: createNewPost,
            getAllNewPosts: getAllNewPosts,
            createNewComment: createNewComment,
            updatePost: updatePost,
            updateComment: updateComment,
            changeSolvedStatus: changeSolvedStatus,
            dbPosts: dbPosts,
            dbCategories: dbCategories,
        };

    return service;

    ////////////////

    function getAllCategories(callback) {
        $http.get('./api/v1/get-all-categories/').then(function(categories) {
            dbCategories = categories.data
            console.log('loaded categories:')
            console.log(dbCategories)
            callback(categories);
        });
    }
        function getAllNewPosts(callback) {
            $http.get('./api/v1/get-all-new-posts').then(function(posts) {

                callback(posts);
            });

        }
    function getAllPostsFilteredByCategory(category, callback) {

        $http.get('./api/v1/get-all-posts-filtered-by-category/' + category).then(function(res) {
            dbPosts = res.data
            console.log('all posts of category: ' + category)
            console.log(dbPosts)
            callback(res);
        });
    }
    function getAllTagsFilteredByCategory(category, callback) {
        $http.get('./api/v1/get-all-tags-filtered-by-category/' + category).then(function(res) {
            callback(res)
        })
    }
    function getPostById(postId, callback) {
        $http.get('./api/v1/get-post-by-id/' + postId).then(function(post) {
            currentPost = post.data
            callback(post)
        })
    }
    function IncreaseViewByOne(postId) {
        $http.get('./api/v1/increase-view-by-one/' + postId)
    }
    function createNewPost(category, tags, title, text, callback) {
        $http.post('./api/v1/create-new-post/', {category: category, tags: tags, title: title, text: text}).then(function(res) {

            currentPost = res.data.post
            callback(currentPost)
        })
    }
    function createNewComment(postId, text, callback) {
        $http.post('./api/v1/create-new-comment/', {postId: postId, text: text}).then(function(res) {
            callback(res.data.comment)
        })
    }
    function updatePost(post, callback) {
        $http.post('./api/v1/update-post/', {post: post}).then(function(res) {
            currentPost = res.data
            callback()
        })
    }
    function updateComment(comment, callback) {
        $http.post('./api/v1/update-comment', {comment: comment}).then(function(res) {
            if(res.status == 200) {
                callback()
            }
            else {
                console.log('error update comment')
            }
        })
    }

    function changeSolvedStatus(postId, solved, callback) {
        $http.post('./api/v1/update-solved-status/', {postId: postId, solved: solved}).then(callback)
    }

    function updateCurrentPost(postId) {
        currentPost = dbPosts.filter(function(post){
            return post._id === postId
        })[0]
        IncreaseViewByOne(currentPost._id)

    }
    function getCurrentPost() {
        return currentPost;
    }
}
})
();