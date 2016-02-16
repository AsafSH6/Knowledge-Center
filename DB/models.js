var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    image: { data: Buffer, contentType: String }
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
    profile_image: {type: Schema.Types.ObjectId, ref: 'Image'}
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
    category: categorySchema
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
    solved: {type: Boolean, default: false}
}, {strict: true})

postSchema.statics.getPostsHomePage = function(callback){
    this.find({}).sort('-creation_date').populate('user', 'username').limit(3)
        .exec(function(err, posts) {

                callback(posts);

    });
}

tagSchema.statics.getAllTags = function(callback){
    return this.find({}, callback);
}

user.statics.getAddress = function(callback){
    this.find({}, 'username street_addr city_addr', function (err, addr) {
        console.log(addr);
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
user.statics.updateUserAdmin = function(username, password, email, userId, callback){

    this.findOneAndUpdate({'_id': userId}, {'username': username, 'password': password, 'email': email},function(err){
        if(err){
            callback(false);
        }
        else{
            callback(true);
        }
    })

}


tagSchema.statics.removeTags = function(tagId, callback){
    this.findById(tagId, function(err, tag) {
        mongoose.model("Post").update({'tags._id': tag._id}, {$pull: {'tags': tag}}, function(err, posts) {
            console.log(posts)
            tag.remove(function(err) {
                if(err) {
                    callback(err)
                }
                else {
                    console.log('removed tag')
                    callback(null)
                }
            })
        })
    })

}


tagSchema.statics.createNewTag= function(name, callback){
    var tagSchema = this
    this.findOne({name: name}, function(err, tag) {
        if(tag) {
            console.log("tag already exists: " + tag);
            //mongoose.disconnect();
            return false;
        }
        else {


                    var tag = new tagSchema({name: name});
                    tag.save(function (err) {
                        if (err) {
                            console.log("error: couldn't save the tag");
                            //mongoose.disconnect();
                            return false;
                        }
                        else {
                            console.log("saved tag: " +  tag);
                            callback(tag);
                            //mongoose.disconnect();
                            return tag._id;
                        }
                    })
                }
    })
}


categorySchema.statics.findAllCategories = function(callback) {
    return this.find({}, callback)
}

postSchema.statics.findAllPostsFilteredByCategory = function(category, callback) {
    return this.find({'category.name': category})
        .sort('-creation_date')
        .populate('user', 'username points')
        .populate('comments')
        .exec(function(err, posts) {
            mongoose.model('Comment').populate(posts, {
                path: 'comments.user',
                select: 'username points',
                model: mongoose.model('User')
            }, callback)
        })
}

user.statics.getAllUsersAdmin = function(callback){//TODO - add admin password and username, also add picture
    return this.find({}, callback);
}

user.statics.removeUserAdmin= function(user_id, callback) {//TODO - add admin password and username, also add picture
    this.findById({_id: user_id}).remove(callback);

}

tagSchema.statics.findAllTagsFilteredByCategory = function(category, callback) {
    return this.find({'categories.name': category}, callback)
}

postSchema.statics.findPostById = function(postId, callback) {
    return this.findById(postId)
        .populate('user', 'username points')
        .populate('comments')
        .exec(function(err, posts) {
            mongoose.model('Comment').populate(posts, {
                path: 'comments.user',
                select: 'username points',
                model: mongoose.model('User')
            }, callback)
        })
}

postSchema.statics.createNewPost = function(userId, category, tags, title, text, callback) {
    var createNewPost = this
    mongoose.model('Category').findOne({name: category}, function(err, category) {
        if(err) {
            console.log('could not find category')
            return false
        }
        mongoose.model('Tag').find({name: {$in: tags}}, function(err, tags) {
            if(err) {
                console.log('could not find tags')
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
                    console.log('could not save post')
                    return false
                }
                console.log('saved post')
                createNewPost.findById(post._id)
                    .populate('user', 'username points')
                    .exec(callback)
                return post._id
            })
        })

    })
}

postSchema.statics.deletePost = function (userId, postId, callback) {
    console.log(postId)
    this.findById(postId, function(err, post) {
        if(err) {
            callback('error')
        }
        else {
            if(userId.equals(post.user)) {
                console.log(post.comments)
                mongoose.model('Comment').remove({_id: {$in: post.comments}}, function(err) {
                    console.log('removed comments')
                    if(err) {
                        callback('error')
                    }
                    else {
                        post.remove(function(err) {
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
        }
    })
}

commentSchema.statics.createNewCommentAndPushToPost = function(userId, postId, text, callback) {
    var createNewCommentAndPushToPost = this
    mongoose.model('Post').findById(postId, function(err, post) {
        if (err) {
            console.log('could not find post')
            return false
        }
        var comment = createNewCommentAndPushToPost({
            user: userId,
            category: post.category,
            text: text
        })
        comment.save(function (err) {
            if (err) {
                console.log("error: couldn't save the comment")
                return false
            }
            post.update({$push: {comments: comment._id}}, function (err) {
                if (err) {
                    console.log("couldn't update post")
                }
                else {
                    console.log("updated post.")
                    mongoose.model('Comment').findById(comment._id)
                        .populate('user', 'username points')
                        .exec(callback)
                }
            });
        })
    })
}

postSchema.statics.updatePost = function (userId, updatedPost, callback) {
    var postSchema = this
    this.findById(updatedPost._id, function(err, post) {
        if(err) {
            console.log('could not update post')
        }
        else {
            console.log(userId)
            console.log(post.user)
            if(userId.equals(post.user)) {
                mongoose.model('Tag').find({name: {$in: updatedPost.tags}}, function(err, tags) {
                    if (err) {
                        console.log('could not find tags')
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
            console.log('could not update comment')
        }
        else {
            console.log(userId)
            console.log(comment.user)
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

postSchema.methods.increasePostViewByOne = function(callback) {
    this.update({views: (this.views + 1)}, function(err) {
        if(err!=null) {
            console.log(err)
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
