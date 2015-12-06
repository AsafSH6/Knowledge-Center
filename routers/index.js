var express = require('express');
var messages = require('../DB/messages');
var models = require('../DB/models')
var router = express.Router();


/* GET home page. */
//router.get('/:screen_id*?', function(req, res, next) {
//    var screenId = req.params.screen_id;
//    console.log(screenId);
//    var screenMessagesList = new Array();
//    if(screenId == undefined) {
//        console.log('screen is undefined');
//        res.send("no screen id.");
//    }
//    else {
//        for(var message in messages) {
//            var screens = messages[message].screenIds;
//
//            if(screens.indexOf(screenId) != -1) {
//                screenMessagesList.push(message);
//                console.log('pushed');
//            }
//        }
//        console.log(screenMessagesList)
//        console.log('screen: ' + screenId);
//        res.render('indexold.html');
//    }
//});

router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index.html');
});

router.get('/test', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('angularTEST.html');
});

router.get('/api/v1/get-all-categories', function(req, res) {
    models.Category.find({}, function(err, categories) {
        console.log('in categories')
        res.json(categories)
    })
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
