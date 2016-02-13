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
<<<<<<< HEAD:public/knowledgeCenterApp/knowledge_center.service.js
        $http.get('./api/v1/get-all-posts-filtered-by-category/' + category).then(function(posts) {
            dbPosts = posts.data;
            callback(posts);
=======
        $http.get('./api/v1/get-all-posts-filtered-by-category/' + category).then(function(res) {
            dbPosts = res.data
            console.log('all posts of category: ' + category)
            console.log(dbPosts)
            callback(res);
>>>>>>> Asaf-final-project:public/knowledgeCenterApp/services/APIService.js
        });
    }
    function getAllTagsFilteredByCategory(category, callback) {
        $http.get('./api/v1/get-all-tags-filtered-by-category/' + category).then(function(res) {
            callback(res)
        })
    }

    function getPostById(postId, callback) {
        $http.get('./api/v1/get-post-by-id/' + postId).then(function(post) {
<<<<<<< HEAD:public/knowledgeCenterApp/knowledge_center.service.js
            console.log(post.data);
=======
            console.log("get post by id: " + post.data)
>>>>>>> Asaf-final-project:public/knowledgeCenterApp/services/APIService.js
            callback(post)
        })
    }
    function IncreaseViewByOne(postId) {
        $http.get('./api/v1/increase-view-by-one/' + postId)
    }
    function createNewPost(category, tags, title, text, callback) {
        $http.post('./api/v1/create-new-post/', {category: category, tags: tags, title: title, text: text}).then(function(res) {
<<<<<<< HEAD:public/knowledgeCenterApp/knowledge_center.service.js
            console.log(res);
            callback(res.data)
=======
            currentPost = res.data.post
            callback(currentPost)
>>>>>>> Asaf-final-project:public/knowledgeCenterApp/services/APIService.js
        })
    }
    function createNewComment(postId, text, callback) {
        $http.post('./api/v1/create-new-comment/', {postId: postId, text: text}).then(function(res) {
            callback(res.data.comment)
        })
    }

    function changeSolvedStatus(postId, solved, callback) {
        $http.post('./api/v1/update-solved-status/', {postId: postId, solved: solved}).then(callback)
    }

    function updateCurrentPost(index) {
        currentPost = dbPosts[index]
<<<<<<< HEAD:public/knowledgeCenterApp/knowledge_center.service.js
        IncreaseViewByOne(currentPost._id);
        console.log(currentPost)
=======
        IncreaseViewByOne(currentPost._id)
>>>>>>> Asaf-final-project:public/knowledgeCenterApp/services/APIService.js
    }
    function getCurrentPost() {
        return currentPost;
    }
}
})
();