(function () {
    'use strict';

    angular
        .module('adminConsole')
        .factory('dataService', adminConsoleService);

    adminConsoleService.$inject = ['$http'];

    /* @ngInject */
    function adminConsoleService($http) {

        var service;
        var addr = null;
        var users = null;
        var dbPosts = null;
        service = {
            getAllUsers: getAllUsers,
            getAllTags: getAllTags,
            getAllAddresses:getAllAddresses,
            addTag: addTag,
            removeTag: removeTag,
           // removeUser: removeUser,
            updateUser: updateUser,
            createUser: createUser,
            getAllCategories: getAllCategories,
            getAllPostsFilteredByCategory: getAllPostsFilteredByCategory,
            getPostById: getPostById,
            createNewPost: createNewPost,
            getUser: getUser,
            users: users,
            dbPosts: dbPosts,
            addr: addr
        };

        return service;


        function getAllUsers(callback){

            $http.get('/api/v1/get-all-users/', callback).then(function(res) {
                console.log(res);
                users = res.data;
                callback(res.data)
            })
        }

        function getUser(index){

            return users[index];

        }

        function getAllAddresses(callback){

            $http.get('/api/v1/get-all-addresses/', callback).then(function(res) {
                console.log(res);
                addr = res.data;
                callback(res.data)
            })
        }

        function getAllTags(callback){
            //TODO- change the function to get credentials
            $http.get('/api/v1/get-all-tags/', callback).then(function(res) {
                console.log(res);
                users = res.data;
                callback(res.data)
            })

        }

        function removeTag (tagId, callback){
            $http.post('/api/v1/delete-tag/', {'tagId':tagId} , callback).then(function(res) {

                console.log(res.status);
                callback(res.status)
            })
        }


        function addTag (tagName, callback){
            $http.post('/api/v1/add-tag/', {'tagName':tagName} , callback).then(function(res) {
                if(res.status != 200) {
                    callback('error', null)
                }
                else {
                    console.log(res.status);
                    callback(null, res.data)
                }

            })
        }


        function updateUser(username, useremail, userId, callback){
            $http.post('/api/v1/admin/edit-user/', { username: username, email: useremail, userId: userId})
                .success(function(res) {
                console.log(res)
                callback(200);
            }).error(function() {
                console.log('create user error')
                callback(500)
            })

        }

        function createUser(username, password, email, callback){
            $http.post('/api/v1/create-user/', {username: username, password: password, userEmail: email})
                .then(function(res) {
                    console.log(res)
                    callback(res.data)
                })
        }

        function getAllCategories(callback) {
            $http.get('/api/v1/get-all-categories').then(function(categories) {

                callback(categories);
            });

        }
        function getAllPostsFilteredByCategory(category, callback) {
            $http.get('/api/v1/get-all-posts-filtered-by-category/' + category).then(function(res) {
                dbPosts = res.data
                console.log('all posts of category: ' + category)
                console.log(dbPosts)
                callback(res);
            });
        }
        function getPostById(postId, callback) {
            $http.get('/api/v1/get-post-by-id/' + postId).then(function(post) {
                console.log(post.data)
                callback(post)
            })
        }

        function createNewPost(category, tags, title, text, callback) {
            $http.post('/api/v1/create-new-post/', {category: category, tags: tags, title: title, text: text}).then(function(res) {
                console.log(res.data)
                callback(res)
            })
        }


    }
})
();