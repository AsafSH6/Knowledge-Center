var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    image: { data: Buffer, contentType: String }
}, {strict: true})

var user = new Schema({
    username: String,
    password: String,
    email: String,
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
    categories: [categorySchema]
}, {strict: true})

var postSchema = new Schema({
    title: String,
    text: String,
    creation_date: { type: Date, default: Date.now },
    views: {type: Number, default: 0},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    categories: [categorySchema],
    tags: [tagSchema],
    solved: {type: Boolean, default: false}
}, {strict: true})

categorySchema.statics.findAllCategories = function(callback) {
    return this.find({}, callback)
}

postSchema.statics.findAllPostsFilteredByCategory = function(category, callback) {
    return this.find({'categories.name': category})
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
        var post = new createNewPost({
            user: userId,
            categories: [category],
            //tags: [],
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
            category: post.categories,
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
