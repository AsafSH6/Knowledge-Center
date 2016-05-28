(function () {
    'use strict';
//comunicates with the server API
    angular
        .module('KnowledgeCenter')
        .factory('APIService', APIService);

    APIService.$inject = ['$http','$state'];

    /* @ngInject */
    function APIService($http,$state) {
        var dbPosts = null
        var dbCategories = null
        var currentPost = null
        var service = {
            getAllImages: getAllImages,
            getAllCategories: getAllCategories,
            getAllPostsFilteredByCategory: getAllPostsFilteredByCategory,
            getAllTags: getAllTags,
            getPostById: getPostById,
            getHomePosts:getHomePosts,
            updateCurrentPost: updateCurrentPost,
            getCurrentPost: getCurrentPost,
            createNewPost: createNewPost,
            getAllNewPosts: getAllNewPosts,
            createNewComment: createNewComment,
            updatePost: updatePost,
            updateComment: updateComment,
            deletePost: deletePost,
            deleteComment: deleteComment,
            search: search,
            changeSolvedStatus: changeSolvedStatus,
            insertPost: insertPost
        };

    return service;

    ////////////////
    function getAllImages(callback) {
        $http.get('/api/v1/get-all-images/').success(function(images) {
            callback(images)
        }).error(function() {
            //something
        })
    }

    function getAllCategories(callback) {
        $http.get('/api/v1/get-all-categories/').success(function(categories) {
            dbCategories = categories
            console.log('loaded categories:')
            console.log(dbCategories)
            callback(categories);
        }).error(function(){
            $state.go('error')
        });
    }

        function getHomePosts(callback) {
            $http.get('./api/v1/get-home-posts/').then(function(posts) {

                console.log('loaded home posts:')
                console.log(posts);
                callback(posts.data);
            });
        }
        function getAllNewPosts(callback) {
            $http.get('/api/v1/get-all-new-posts').success(function(posts) {
                callback(posts);
            }).error(function(){
                $state.go('error')
            });

        }
    function getAllPostsFilteredByCategory(category, callback) {

        $http.get('/api/v1/get-all-posts-filtered-by-category/' + category).success(function(posts) {
            dbPosts = posts
            console.log('all posts of category: ' + category)
            console.log(dbPosts)
            callback(posts);
        }).error(function(){
            $state.go('error')
        });;
    }
    function getAllTags(callback) {
        $http.get('/api/v1/get-all-tags/').success(function(res) {
            callback(res)
        }).error(function(){
            $state.go('error')
        })
    }
    function getPostById(postId, callback) {
        console.log('asking for post ' + postId)
        $http.get('/api/v1/get-post-by-id/' + postId).success(function(post) {
            currentPost = post
            callback(post)
        }).error(function(){
            $state.go('error')
        });
    }
    function IncreaseViewByOne(postId) {
        $http.get('/api/v1/increase-view-by-one/' + postId)
    }
            function createNewPost(category, tags, title, text, callback) {
                $http.post('/api/v1/create-new-post/', {category: category, tags: tags, title: title, text: text}).success(function(posts) {
            currentPost = posts
            callback(currentPost)
        }).error(function(){
            $state.go('error')
        });
    }
    function createNewComment(postId, text, callback) {
        $http.post('/api/v1/create-new-comment/', {postId: postId, text: text}).success(function(posts) {
            callback(posts)
        }).error(function(){
            $state.go('error')
        });
    }
    function updatePost(post, callback) {
        $http.post('/api/v1/update-post/', {post: post}).success(function(posts) {
            currentPost = posts
            callback()
        }).error(function(){
            $state.go('error')
        });
    }
    function updateComment(comment, callback) {
        $http.post('/api/v1/update-comment', {comment: comment}).success(function(res) {
                callback()
        }).error(function(){
            $state.go('error')
        });
    }
    function deletePost(postId, callback) {
        $http.post('/api/v1/delete-post/', {postId: postId}).success(function(res) {
                callback()
        }).error(function(){
            $state.go('error')
        });
    }
    function deleteComment(commentId, postId, callback) {
        $http.post('/api/v1/delete-comment/', {commentId: commentId, postId: postId}).success(function(res) {
                callback()
        }).error(function(){
            $state.go('error')
        });
    }
    function search(searchParams, callback) {
        $http.post('/api/v1/search/', searchParams).success(function(posts) {
            dbPosts = posts
            callback(posts)
         }).error(function(){
            $state.go('error')
        });
    }
    function changeSolvedStatus(postId, solved, callback) {
        $http.post('/api/v1/update-solved-status/', {postId: postId, solved: solved}).then(callback)
    }
    function insertPost(post) {
        dbPosts.unshift(post)
    }
    function updateCurrentPost(postId) {
        if(dbPosts == null && typeof postId == 'object') {
            currentPost = postId
            IncreaseViewByOne(currentPost._id)
        }
        else {
            currentPost = dbPosts.filter(function(post){
                return post._id === postId
            })[0]
            IncreaseViewByOne(currentPost._id)
        }
    }
    function getCurrentPost() {
        return currentPost;
    }
}
})
();