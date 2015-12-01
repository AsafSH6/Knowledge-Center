var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    image: { data: Buffer, contentType: String }
})

var user = new Schema({
    username: String,
    password: String,
    email: String,
    points: Number,
    creation_date: { type: Date, default: Date.now },
    profile_image: {type: Schema.Types.ObjectId, ref: 'Image'}
})

var categorySchema = new Schema({
    name: String,
    url: String
})

var tagSchema = new Schema({
    name: String,
    category: [categorySchema]
})

var commentSchema = new Schema({
    text: String,
    creation_date: { type: Date, default: Date.now },
    up_votes: {type: Number, default: 0},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    category: categorySchema
})

var postSchema = new Schema({
    title: String,
    text: String,
    creation_date: { type: Date, default: Date.now },
    views: {type: Number, default: 0},
    user: user,
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    categories: [categorySchema],
    tags: [tagSchema]
})

module.exports.Image = mongoose.model('Image', imageSchema, 'images');
module.exports.User = mongoose.model('User', user, 'users');
module.exports.Category = mongoose.model('Category', categorySchema, 'categories');
module.exports.Tag = mongoose.model('Tag', tagSchema, 'tags');
module.exports.Comment = mongoose.model('Comment', commentSchema, 'comments');
module.exports.Post = mongoose.model('Post', postSchema, 'posts');
