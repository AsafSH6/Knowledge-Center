var models = require('../DB/models')
var mongoose = require('mongoose');
var dbConfig = require('./config');

mongoose.connect(dbConfig.url);

function createNewCategory(name, url, callback) {
    models.Category.findOne({$or: [{name: name}, {url: url}]}, function(err, category) {
        if(category) {
            console.log("category already exists: " + category);
            mongoose.disconnect();
            return false;
        }
        else {
            var category = new models.Category({name: name, url: url});
            category.save(function (err) {
                if (err) {
                    console.log("error: couldn't save the category");
                    mongoose.disconnect();
                    return false;
                }
                else {
                    console.log("saved category: " +  category);
                    callback(category)
                    mongoose.disconnect();
                    return category._id;
                }
            })
        }
    })
}

function createNewTag(name, categoryName, callback) {
    models.Tag.findOne({name: name}, function(err, tag) {
        if(tag) {
            console.log("tag already exists: " + tag);
            mongoose.disconnect();
            return false;
        }
        else {
            models.Category.findOne({name: categoryName}, function(err, category) {
                if(!category) {
                    console.log("category does not exists.");
                    mongoose.disconnect();
                    return false;
                }
                else {
                    var tag = new models.Tag({name: name, category: category});
                    tag.save(function (err) {
                        if (err) {
                            console.log("error: couldn't save the tag");
                            mongoose.disconnect();
                            return false;
                        }
                        else {
                            console.log("saved tag: " +  tag);
                            callback(tag);
                            mongoose.disconnect();
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
            mongoose.disconnect();
            return false;
        }
        else {
            models.Category.find({name: {$in: categoriesName}}, function(err, categories) {
                if(categories.length != categoriesName.length) {
                    console.log("One or more of the categories list does not exits: "+ categories);
                    mongoose.disconnect();
                    return false;
                }
                else {
                    models.Tag.find({name: {$in: tagsName}}, function(err, tags) {
                        if(tags.length != tagsName.length) {
                            console.log("One or more of the tags list does not exits: "+ tags);
                            mongoose.disconnect();
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
                                    mongoose.disconnect();
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
        if(!user) {
            console.log('user does not exits');
            mongoose.disconnect();
            return false;
        }
        else {
            models.Post.findById(postID, function(err, post) {
                if(!post) {
                    console.log('post does not exits.');
                    mongoose.disconnect();
                    return false;
                }
                else {
                    var comment = new models.Comment({
                        user: user._id,
                        text: text,
                        category: post.categories
                    });
                    comment.save(function (err) {
                        if (err) {
                            console.log("error: couldn't save the comment");
                            mongoose.disconnect();
                            return false;
                        }
                        else {
                            console.log("saved comment: " +  comment);
                            post.update({$push: {comments: comment}}, function(err) {
                                if(err) {
                                    console.log("couldn't update post");
                                    mongoose.disconnect();
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

createNewCategory('TEST4', 'www.test.com3', function(){});
//createNewTag('TEST3', 'TEST7', function(){});
//createNewPost('Asaf', 'TEST5', "ABCDE", ['Style Frame', 'Gal'], ['A', 'TEST1'], function(post){
//    console.log(post._id);
//    createNewCommentAndPushToPost('Asaf', post._id, "COMMENT2", function(){});
//});

