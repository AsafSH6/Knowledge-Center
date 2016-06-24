var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    imageURL: String
}, {strict: true})

var user = new Schema({
    username: String,
    password: String,
    is_admin: {type: Boolean, default: false},
    email: String,
    street_addr: String,
    city_addr: String,
    points: Number,
    creation_date: { type: Date, default: Date.now },
    profile_image: imageSchema,
    deleted: {type: Boolean, default: false},
}, {strict: true})

var categorySchema = new Schema({
    name: String,
    url: String
}, {strict: true})

var tagSchema = new Schema({
    name: String,
    categories: [categorySchema]
}, {strict: true})

var commentSchema = new Schema({
    text: String,
    creation_date: { type: Date, default: Date.now },
    up_votes: {type: Number, default: 0},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    category: categorySchema,
    deleted: {type: Boolean, default: false},
}, {strict: true})

var postSchema = new Schema({
    title: String,
    text: String,
    creation_date: { type: Date, default: Date.now },
    views: {type: Number, default: 0},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    category: categorySchema,
    tags: [tagSchema],
    solved: {type: Boolean, default: false},
    deleted: {type: Boolean, default: false},
}, {strict: true})

var Enum = {
    numberOfLastestPosts: 3
}

imageSchema.statics.findAllImages = function(callback) {
    return this.find({}, callback)
}

/* get the last posts */
postSchema.statics.getPostsHomePage = function(callback) {
    this.find({}).sort('-creation_date').populate('user', 'username').limit(Enum.numberOfLastestPosts)
        .exec(function (err, posts) {

            callback(posts);

        });
}

tagSchema.statics.getAllTags = function(callback){
    return this.find({}, callback);
}

/* get the street address and city address of user */
user.statics.getAddress = function(callback){
    this.find({}, 'username street_addr city_addr', function (err, addr) {
        callback(addr);
    });
}

user.statics.checkIfAdmin = function(username, password, callback){

    this.findOne({'username': username, 'password': password},function(err, user){

        if(user.is_admin){
            callback(user);
        }
        else{
            callback(null);
        }
    })
}

user.statics.updateUserAdmin = function(username, email, userId, callback){
    this.findOneAndUpdate({_id: userId},{$set: {'username': username, 'email': email}}, callback)
}

tagSchema.statics.removeTags = function(tagId, callback){
    this.findById(tagId, function(err, tag) {
        mongoose.model("Post").update({'tags._id': tag._id}, {$pull: {'tags': tag}}, function(err, posts) {
            tag.remove(function(err) {
                if(err) {
                    callback(err)
                }
                else {
                    callback(null)
                }
            })
        })
    })
}

tagSchema.statics.createNewTag= function(name, callback){
    var tagSchema = this
    this.findOne({name: name}, function(err, tag) {
        if(err) {
           callback(err,null)
        }
        else {
            var tag = new tagSchema({name: name});
            tag.save(function (err) {
                if (err) {
                    callback(err,null)
                }
                else {

                    callback(null,tag);
                    return tag._id;
                }
            })
        }
    })
}

categorySchema.statics.findAllCategories = function(callback) {
    return this.find({}, callback)
}

postSchema.statics.findAllPosts = function(callback) {
    return this.find({deleted: false}, callback)
}

postSchema.statics.findAllPostsFilteredByCategory = function(category, callback) {
    return this.find({'category.name': category, deleted: false})
        .sort('-creation_date')
        .populate('user', 'username profile_image')
        .populate('comments')
        .exec(function(err, posts) {
            mongoose.model('Comment').populate(posts, {
                path: 'comments.user',
                select: 'username profile_image',
                model: mongoose.model('User')
            }, function(err, posts){
                for(var post in posts) {
                    posts[post].comments = posts[post].comments.filter(function(comment) {return comment.deleted == false})
                }
                callback(err, posts)
            })
        })
}

user.statics.getAllUsers = function(callback){
    return this.find({deleted: false}, callback);
}

tagSchema.statics.findAllTagsFilteredByCategory = function(category, callback) {
    return this.find({'categories.name': category}, callback)
}

postSchema.statics.findPostById = function(postId, callback) {
    return this.findById(postId)
        .populate('user', 'username profile_image')
        .populate('comments')
        .exec(function(err, post) {
            if(post.deleted == false) {
                mongoose.model('Comment').populate(post, {
                    path: 'comments.user',
                    select: 'username profile_image',
                    model: mongoose.model('User')
                }, function (err, post) {
                    post.comments = post.comments.filter(function (comment) {
                        return comment.deleted == false
                    })
                    callback(err, post)
                })
            }
            else {
                callback(true, null)
            }
        })
}

postSchema.statics.createNewPost = function(userId, category, tags, title, text, callback) {
    var createNewPost = this
    mongoose.model('Category').findOne({name: category}, function(err, category) {
        if(err) {
            return false
        }
        mongoose.model('Tag').find({name: {$in: tags}}, function(err, tags) {
            if(err) {
                return false
            }
            var post = new createNewPost({
                user: userId,
                category: category,
                tags: tags,
                title: title,
                text: text
            })

            post.save(function(err) {
                if(err) {
                    return false
                }
                createNewPost.findById(post._id)
                    .populate('user', 'username profile_image')
                    .exec(callback)
                return post._id
            })
        })

    })
}

postSchema.statics.deletePost = function (user, postId, callback) {
    this.findById(postId, function(err, post) {
        if(err) {
            callback('error')
        }
        else {
            if(user != undefined &&user.is_admin == true || user._id.equals(post.user)) {
                mongoose.model('Comment').update({_id: {$in: post.comments}}, {deleted: true} ,function(err) {
                    if(err) {
                        callback('error')
                    }
                    else {
                        post.update({deleted: true}, function(err) {
                            if(err) {
                                callback('error')
                            }
                            else {
                                callback(null)
                            }
                        })
                    }
                })
            }
            else {
                callback('error')
            }
        }
    })
}

postSchema.statics.search = function(searchParams, callback) {
    if(searchParams.category == '') {
        searchParams.categoryQuery = {}
    }
    else {
        searchParams.categoryQuery = {'category.name': searchParams.category}
    }
    if(searchParams.tag == '') {
        searchParams.tagsQuery = {}
    }
    else {
        searchParams.tagsQuery =  {'tags.name': searchParams.tag}
    }
    if(searchParams.text == '') {
        searchParams.textQuery = {}
    }
    else {
        searchParams.textQuery = {$or: [{'text': {$regex : new RegExp(searchParams.text, 'i')}}, {'title': {$regex : new RegExp(searchParams.text, 'i')}}]}
    }
    this.find({$and: [searchParams.categoryQuery,
        searchParams.tagsQuery,
        searchParams.textQuery,
    ], deleted: false})
        .populate('user', 'username profile_image')
        .populate('comments')
        .exec(function(err, posts) {
            if(err){
                callback(err, null)
            }
            else {
                mongoose.model('Comment').populate(posts, {
                    path: 'comments.user',
                    select: 'username profile_image',
                    model: mongoose.model('User')
            }, function(err, posts) {
                if(!err){
                    for(var post in posts) {
                        posts[post].comments = posts[post].comments.filter(function(comment) {return comment.deleted == false})
                    }
                    callback(null, posts)
                }
                else{
                    callback(err, null)
                }

            })
        }})
}

commentSchema.statics.deleteComment = function (userId, commentId, callback) {
    this.findById(commentId, function(err, comment) {
        if(err) {
            callback('error')
        }
        else {
            if(userId.equals(comment.user)) {
                comment.update({deleted: true}, function(err) {
                    if(err) {
                        callback('error', null)
                    }
                    else {
                        callback(null)
                    }
                })
            }
        }
    })
}

commentSchema.statics.createNewCommentAndPushToPost = function(userId, postId, text, callback) {
    var createNewCommentAndPushToPost = this
    mongoose.model('Post').findById(postId)
        .populate('user', 'email')
        .exec(function(err, post) {
        if (err) {
            return false
        }
        var comment = createNewCommentAndPushToPost({
            user: userId,
            category: post.category,
            text: text
        })
        comment.save(function (err) {
            if (err) {
                return false
            }
            post.update({$push: {comments: comment._id}}, function (err) {
                if (err) {
                }
                else {
                    mongoose.model('Comment').findById(comment._id)
                        .populate('user', 'username profile_image')
                        .exec(function(err, comment) {
                            callback(err, comment, post)
                        })
                }
            });
        })
    })
}

postSchema.statics.updatePost = function (userId, updatedPost, callback) {
    var postSchema = this
    this.findById(updatedPost._id, function(err, post) {
        if(err) {
            callback(true, null)
        }
        else {
            if(userId.equals(post.user)) {
                mongoose.model('Tag').find({name: {$in: updatedPost.tags}}, function(err, tags) {
                    if (err) {
                        callback(err, null)
                    }
                    else {
                        post.update({$set: {title: updatedPost.title, text: updatedPost.text, tags: tags}}, function(err) {
                            postSchema.findPostById(post._id, callback)
                        })
                    }
                })
            }
        }
    })
}

commentSchema.statics.updateComment = function (userId, updatedComment, callback) {
    this.findById(updatedComment._id, function(err, comment) {
        if(err) {
            callback(err, null)
        }
        else {
            if(userId.equals(comment.user)) {
                comment.update({$set: {text: updatedComment.text}}, callback)
            }
        }
    })
}

postSchema.statics.updateSolvedStatus = function(userId, postId, solvedStatus, callback) {
    this.findById(postId, function(err, post) {
        if(post.user.equals(userId)) {
            post.update({$set: {solved: solvedStatus}}, callback)
        }
        else {
            callback('error')
        }
    })
}

/* get posts grouped by their category
  * output : list of json which contain the category and ID and the sum as the counter
*/
postSchema.statics.getPostsGroupedByCategory = function(callback) {
    this.aggregate({$group: {_id: '$category.name', count: {$sum: 1}}}, callback)
}

/* get tags and the number of related posts
 * map-reduce style
  * map: iterate over the post's tags and emit them (key=tag name, value=1)
  * reduce: gets the tag name as key and then calculate the sum
*/
postSchema.statics.getNumberOfRelatedPostsForEachTag = function(callback) {
    // map function that emits each tag name of in post and the sum 1
    var map = function () {
        var tags = this.tags
        for (var tag in tags) {
            emit(tags[tag].name, {sum: 1})
        }
    }

    // reduce function that collects each id (which is tag name) and calculate the total sum
    var reduce = function (id, arr) {
        var sum = 0
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i].sum
        }
        return {sum: sum}
    }

    this.mapReduce({map: map, reduce: reduce}, callback)
}

postSchema.methods.increasePostViewByOne = function(callback) {
    this.update({views: (this.views + 1)}, function(err) {
        if(!err) {
            callback(err)
        }
        else {
            callback(this)
        }
    })
}


module.exports.Image = mongoose.model('Image', imageSchema, 'images');
module.exports.User = mongoose.model('User', user, 'users');
module.exports.Category = mongoose.model('Category', categorySchema, 'categories');
module.exports.Tag = mongoose.model('Tag', tagSchema, 'tags');
module.exports.Comment = mongoose.model('Comment', commentSchema, 'comments');
module.exports.Post = mongoose.model('Post', postSchema, 'posts');
