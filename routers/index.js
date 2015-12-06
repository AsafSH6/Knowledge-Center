var express = require('express');
var messages = require('../DB/messages');
var models = require('../DB/models')
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index.html');
});

router.get('/api/v1/get-all-categories', function(req, res) {
    models.Category.findAllCategories(function(err, categories) {
        res.json(categories)
    })
});

router.get('/api/v1/get-all-posts-filtered-by-category/:category', function(req, res) {
    console.log(req.params['category'])
    models.Post.findAllPostsFilteredByCategory(req.params['category'], function(err, posts) {
        if(err!=null) {
            console.log(err)
        }
        res.json(posts)
    })
});


















router.get('/test', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('angularTEST.html');
});

router.post('/test/create_post', function(req, res) {
    console.log("ba");
    var post = new models.Post();
    post.title = req.params.title;
    post.text = req.params.text;
    models.Category.findOne({'name': req.body.category}, function(err, category) {
        models.Tag.findOne({'name': req.body.tags}, function(err, tag) {
            post.categories.push(category);
            post.tags.push(tag);
            post.save(function (err) {
                if (err) res.send(err);
                res.json({message: 'User grade created'});
            })
        })
    })
    res.send('worked');
})

router.get('/test/create_category', function(req, res) {
    res.render('category.html')
})

router.post('/test/create_category', function(req, res) {
    var category = new models.Category({'name': req.body.category});
    category.save(function (err) {
        if (err) res.send(err);
        res.json({message: 'Category created'});
    })
})

router.get('/test/create_tag', function(req, res) {
    res.render('tag.html')
})

router.post('/test/create_tag', function(req, res) {
    var tag = new models.Tag({'name': req.body.tag});
    tag.save(function (err) {
        if (err) res.send(err);
        res.json({message: 'Tag created'});
    })
})

module.exports = router;
