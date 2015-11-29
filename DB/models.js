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
    up_votes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    category: categorySchema
})

var postSchema = new Schema({
    title: String,
    text: String,
    creation_date: { type: Date, default: Date.now },
    views: Number,
    user: user,
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    categories: [categorySchema],
    tags: [tagSchema]
})

module.exports.image = mongoose.model('Image', imageSchema, 'images');
module.exports.user = mongoose.model('User', user, 'users');
module.exports.category = mongoose.model('Category', categorySchema, 'categories');
module.exports.tag = mongoose.model('Tag', tagSchema, 'tags');
module.exports.comment = mongoose.model('Comment', commentSchema, 'comments');
module.exports.post = mongoose.model('Post', postSchema, 'posts');
