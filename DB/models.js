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
    user: { id: {type: Schema.Types.ObjectId, ref: 'User'}, userName: {type: String, ref: 'User'}, points: {type: Number, ref: 'User'}},
    categories: [categorySchema]
}, {strict: true})

var postSchema = new Schema({
    title: String,
    text: String,
    creation_date: { type: Date, default: Date.now },
    views: {type: Number, default: 0},
    user: { id: {type: Schema.Types.ObjectId, ref: 'User'}, userName: {type: String, ref: 'User'}, points: {type: Number, ref: 'User'}},
    comments: [commentSchema],
    categories: [categorySchema],
    tags: [tagSchema],
    solved: {type: Boolean, default: false}
}, {strict: true})

categorySchema.statics.findAllCategories = function(callback) {
    return this.find({}, callback)
}

postSchema.statics.findAllPostsFilteredByCategory = function(category, callback) {
    return this.find({'categories.name': category}, callback)
}

postSchema.statics.findPostById = function(postId, callback) {
    return this.findById(postId, callback)
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
