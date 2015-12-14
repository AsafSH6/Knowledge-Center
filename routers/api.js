/**
 * Created by Asaf on 14/12/2015.
 */
var express = require('express');
var models = require('../DB/models')
var router = express.Router();

router.get('/get-all-categories', function(req, res) {
    models.Category.findAllCategories(function(err, categories) {
        res.json(categories)
    })
});

router.get('/get-all-posts-filtered-by-category/:category', function(req, res) {
    console.log(req.params['category'])
    models.Post.findAllPostsFilteredByCategory(req.params['category'], function(err, posts) {
        if(err!=null) {
            console.log(err)
        }
        res.json(posts)
    })
});

router.get('/get-post-by-id/:id', function(req, res) {
    console.log(req.params['id'])
    models.Post.findPostById(req.params['id'], function(err, post) {
        if(err!=null) {
            console.log(err)
        }
        res.json(post)
    })
});

router.get('/increase-view-by-one/:id', function(req, res) {
    models.Post.findPostById(req.params['id'], function(err, post) {
        if(err!=null) {
            console.log(err)
            res.sendStatus(500)
        }
        else {
            post.increasePostViewByOne(function() {
                res.sendStatus(200)
            })
        }
    })
})

module.exports = router;