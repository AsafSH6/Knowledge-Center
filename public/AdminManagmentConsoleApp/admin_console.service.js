(function () {
    'use strict';

    angular
        .module('adminConsole')
        .factory('dataService', adminConsoleService);

    adminConsoleService.$inject = ['$http'];

    /* @ngInject */
    function adminConsoleService($http) {

        var service;
        var users = null;
        var dbPosts = null;
        service = {
            getAllUsers: getAllUsers,
           // removeUser: removeUser,
            updateUser: updateUser,
            createUser: createUser,
            getAllCategories: getAllCategories,
            getAllPostsFilteredByCategory: getAllPostsFilteredByCategory,
            getPostById: getPostById,
            createNewPost: createNewPost,
            users: users,
            dbPosts: dbPosts
        };

        return service;


        function getAllUsers(callback){
            //TODO- change the function to get credentials
            $http.get('./api/v1/get-all-users/', callback).then(function(res) {
                console.log(res);
                users = res.data;
                callback(res.data)
            })

        }

        //function removeUser(user_id, callback){
        //    $http.post('./api/v1/remove-user/', {user_id: user_id}).then(function(res) {
        //        console.log(res)
        //        callback(res.data)
        //    })
        //
        //}

        function updateUser(adminusername,adminpassword, username, userpassword, useremail, callback){
            $http.post('./api/v1/update-user/', {adminUsername: adminusername, adminPassword: adminpassword, username: username, userPassword: userpassword, userEmail: useremail})
                .then(function(res) {
                console.log(res)
                callback(res.data)
            })

        }
        //TODO- Check with Asaf how we should handle this, with regards to the authentication service.
        function createUser(username, password, email, callback){
            $http.post('./api/v1/create-user/', {username: username, password: password, userEmail: email})
                .then(function(res) {
                    console.log(res)
                    callback(res.data)
                })
        }

        function getAllCategories(callback) {
            $http.get('./api/v1/get-all-categories').then(function(categories) {

                callback(categories);
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
        function getPostById(postId, callback) {
            $http.get('./api/v1/get-post-by-id/' + postId).then(function(post) {
                console.log(post.data)
                callback(post)
            })
        }

        function createNewPost(category, tags, title, text, callback) {
            $http.post('./api/v1/create-new-post/', {category: category, tags: tags, title: title, text: text}).then(function(res) {
                console.log(res.data)
                callback(res)
            })
        }


    }
})
();