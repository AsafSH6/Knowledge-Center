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

function createNewTag(name, categoriesName, callback) {
    models.Tag.findOne({name: name}, function(err, tag) {
        if(tag) {
            console.log("tag already exists: " + tag);
            mongoose.disconnect();
            return false;
        }
        else {
            models.Category.find({name: {$in: categoriesName}}, function(err, categories) {
                if(!categories) {
                    console.log("category does not exists.");
                    mongoose.disconnect();
                    return false;
                }
                else {
                    var tag = new models.Tag({name: name, categories: categories});
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
                                    user: {userName: user.username, points: user.points},
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
        console.log(postID)
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


// RUN ONE BY ONE
function insertFakeDataToDB() {
    //createNewCategory('Questions', '/questions', function(){});
    //createNewCategory('Links', '/links', function(){});
    //createNewCategory('Things I learnt today', '/things-I-learnt-today', function(){});
    //createNewCategory('Guides', '/guides', function(){});
    //createNewTag('Python', ['Questions', 'Links', 'Things I learnt today'], function(){});
    //createNewTag('Java', ['Questions', 'Links'], function(){});
    //createNewTag('StyleFrame', ['Questions'], function(){});
    //createNewTag('Pandas', ['Things I learnt today'], function(){});
    //createNewPost('Asaf', 'Pandas guide', "blablabla", ['Guides'], ['Pandas'], function(post){
    //createNewCommentAndPushToPost('Asaf', post._id, "Cool!", function(){});
    //createNewCommentAndPushToPost('Asaf', post._id, "Thanks!!", function(){});
    //createNewCommentAndPushToPost('Asaf', post._id, "Awesome!", function(){});
    //});
    //createNewPost('Asaf', 'Link to StyleFrame github', "www.github/styleframe", ['Links'], [], function(post){
    //    createNewCommentAndPushToPost('Asaf', post._id, "Thanks!", function(){});
    //});
}

//function(){mongoose.disconnect()}
//insertFakeDataToDB()