var models = require('../DB/models')
var mongoose = require('mongoose');
var config = require('../config');
var bCrypt = require('bcrypt-nodejs');


// Generates hash using bCrypt
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function createNewUser(username, password, email, is_admin, image, callback) {
    var user = new models.User({
        username: username,
        password: createHash(password),
        email:  email,
        profile_image: image,
        points: 0,
        is_admin: is_admin
    });
    user.save(function (err) {
        if (err) {
            console.log("error: couldn't save the user");
            return false;
        }
        else {
            console.log("saved user: " +  user);
            callback(user);
            return user._id;
        }
    })
}

function createNewCategory(name, callback) {
    var url = '/' + name
    models.Category.findOne({$or: [{name: name}, {url: url}]}, function(err, category) {
        if(category) {
            console.log("category already exists: " + category);
            return false;
        }
        else {
            var category = new models.Category({name: name, url: url});
            category.save(function (err) {
                if (err) {
                    console.log("error: couldn't save the category");
                    return false;
                }
                else {
                    console.log("saved category: " +  category);
                    callback(category)
                    return category._id;
                }
            })
        }
    })
}

function createNewTag(name, categoriesName, callback) {
    models.Tag.findOne({name: name}, function(err, tag) {
        if(tag) {
            console.log("tag already exists: " + tag);
            return false;
        }
        else {
            models.Category.find({name: {$in: categoriesName}}, function(err, categories) {
                if(!categories) {
                    console.log("category does not exists.");
                    return false;
                }
                else {
                    var tag = new models.Tag({name: name, categories: categories});
                    tag.save(function (err) {
                        if (err) {
                            console.log("error: couldn't save the tag");
                            return false;
                        }
                        else {
                            console.log("saved tag: " +  tag);
                            callback(tag);
                            return tag._id;
                        }
                    })
                }
            })
        }
    })
}

function createNewPost(userName, title, text, categoriesName, tagsName, callback) {
    models.User.findOne({username: userName}, function(err, user) {
        if(!user) {
            console.log("user does not exits");
            return false;
        }
        else {
            models.Category.find({name: {$in: categoriesName}}, function(err, categories) {
                if(categories.length != categoriesName.length) {
                    console.log("One or more of the categories list does not exits: "+ categories);
                    return false;
                }
                else {
                    models.Tag.find({name: {$in: tagsName}}, function(err, tags) {
                        if(tags.length != tagsName.length) {
                            console.log("One or more of the tags list does not exits: "+ tags);
                            return false;
                        }
                        else {
                            var post = new models.Post(
                                {
                                    title: title,
                                    text: text,
                                    user: user._id,
                                    categories: categories,
                                    tags: tags
                                });
                            post.save(function (err) {
                                if (err) {
                                    console.log("error: couldn't save the post");
                                    return false;
                                }
                                else {
                                    console.log("saved post: " +  post);
                                    callback(post);
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

function createNewCommentAndPushToPost(userName, postID, text, callback) {
    models.User.findOne({username: userName}, function(err, user) {
        console.log(postID)
        if(!user) {
            console.log('user does not exits');
            return false;
        }
        else {
            models.Post.findById(postID, function(err, post) {
                if(!post) {
                    console.log('post does not exits.');
                    return false;
                }
                else {
                    var comment = new models.Comment({
                        user:user._id,
                        text: text,
                        category: post.categories
                    });
                    comment.save(function (err) {
                        if (err) {
                            console.log("error: couldn't save the comment");
                            return false;
                        }
                        else {
                            console.log("saved comment: " +  comment);
                            post.update({$push: {comments: comment}}, function(err) {
                                if(err) {
                                    console.log("couldn't update post");
                                }
                                else {
                                    console.log("updated post.")
                                    callback(post, comment);
                                }
                            });
                        }
                    })
                }
            })
        }
    })
}

function createNewImage(imageURL) {
    models.Image({imageURL: imageURL}).save(function() {console.log('saved image ' + imageURL)})
}

function deletePostsAndComments() {
    models.Post.find({deleted: false}).update({deleted: true}, function(){});
    models.Comment.find({deleted: false}).update({deleted: true}, function(){});
    models.User.find({deleted: false}).update({deleted: true}, function(){});
}

function insertImages(callback) {
    var images = ['http://bootdey.com/img/Content/user_1.jpg',
        'http://bootdey.com/img/Content/user_2.jpg',
        'http://bootdey.com/img/Content/user_3.jpg',
        'http://bootdey.com/img/Content/avatar/avatar1.png',
        'http://bootdey.com/img/Content/avatar/avatar2.png',
        'http://bootdey.com/img/Content/avatar/avatar3.png',
        'http://bootdey.com/img/Content/avatar/avatar4.png',
        'http://bootdey.com/img/Content/avatar/avatar5.png',
        ]
    var imagesArr = images.map(function(obj) {
        return {imageURL: obj}
    })

    models.Image.collection.insert(imagesArr, function(err, images) {
        callback(images.ops)
    })
}

function insertCategories(callback) {
    var categories = ['Questions',
        'Links',
        'Thins I learned today',
        'Guides',
        'Bugs and Feedback',
        'Challenges',
        ]
    var categoriesArr = categories.map(function(obj) {
        return {name: obj, url: '/' + obj}
    })
    models.Category.collection.insert(categoriesArr, function(err, categories) {
        callback(categories)
    })
}

function insertTags(callback) {
    var tags = ['Flask', 'Django', 'React', 'Angular', 'Java Script', 'Emails', 'Redux', 'sqlalchemy', 'docxtemplater',
    'Requests', 'Postgres', 'SQL Server', 'Git', 'Virtual env', 'Gunicorn', 'Nginx', 'Ubuntu',
        'Windows', 'Google Drive', 'DropBox', 'Box', 'Numpy', 'datetime', 'Django REST Framework', 'Openpyxl', 'Heroku',
        'NodeJS', 'Bower', 'pip', 'npm', 'Python', 'StyleFrame']

    var tagsArr = tags.map(function(obj) {
        return {name: obj, categories: []}
    })

    models.Tag.collection.insert(tagsArr, function(err, tags) {
        callback(tags)
    })
}

function init_db(adminUsername, adminPassword, adminEmail, callback) {
    console.log('inserting images')
    insertImages(function(images) {
        console.log('creating admin user.')
        createNewUser(adminUsername, adminPassword, adminEmail, true, images[0], function(user) {
            console.log('inserting categories')
            insertCategories(function(categories) {
                console.log('inserting tags')
                insertTags(function(tags) {
                    callback(user, categories, tags)
                })
            })
        })
    })
}

function disconnect(callback) {
    mongoose.disconnect(function() {
        console.log('disconnected')
        callback()
    })
}

module.exports = (function() {
    mongoose.connect(config.mongoDB_connection_string, function() {
        console.log('connected')
    });
    return {
        mongoose: mongoose,
        disconnect: disconnect,
        createNewUser: createNewUser,
        createNewCategory: createNewCategory,
        createNewTag: createNewTag,
        createNewPost: createNewPost,
        createNewCommentAndPushToPost: createNewCommentAndPushToPost,
        createNewImage: createNewImage,
        deletePostsAndComments: deletePostsAndComments,
        init_db: init_db
    }
})()