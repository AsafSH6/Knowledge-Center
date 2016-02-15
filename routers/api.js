/**
 * Created by Asaf on 14/12/2015.
 */
var express = require('express');
var models = require('../DB/models')
var router = express.Router();

router.get('/get-all-categories/', function(req, res) {
    models.Category.findAllCategories(function(err, categories) {
        res.json(categories)
    })
});


router.get('/get-all-tags/', function(req, res) {
    models.Tag.getAllTags(function(err, tags) {
        console.log(tags);
        res.json(tags)
    })
});

router.post('/delete-tag/', function(req, res) {
    models.Tag.removeTags(req.body.tagId, function(err) {
        if(err) {
            return res.sendStatus(500)
        }
        else {
            return res.sendStatus(200)
        }
    })
})

router.post('/add-tag/', function(req, res) {
    models.Tag.createNewTag(req.body.tagName, function(tag) {

            return res.json(tag)

    })
})


//TODO- move to admin router
router.get('/get-all-users/', function(req, res) {
    models.User.getAllUsersAdmin(function(err, users) {
        res.json(users)
    })
});

//router.post('/remove-user/', function(req, res) {// TODO- What to return
//    models.User.removeUserAdmin(req.body.user_id, function(res, err){
//        log(err);
//        res.json("OK");
//    });
//});


router.get('/get-all-posts-filtered-by-category/:category', function(req, res) {
    console.log(req.params['category'])
    models.Post.findAllPostsFilteredByCategory(req.params['category'], function(err, posts) {
        if(err!=null) {
            console.log(err)
        }
        else {
            console.log(posts);
            res.json(posts)
        }
    })
});

router.get('/get-all-tags-filtered-by-category/:category', function(req, res) {
    console.log(req.params['category'])
    models.Tag.findAllTagsFilteredByCategory(req.params['category'], function(err, tags) {
        if(err!=null) {
            console.log(err)
        }
        else {
            res.json(tags)
        }
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
});

router.post('/create-new-post/', function(req, res) {
    models.Post.createNewPost(req.user._id,
                              req.body.category,
                              req.body.tags,
                              req.body.title,
                              req.body.text,
                              function(err, post) {
                                  return res.json({post: post})
                              })
});

router.post('/create-new-comment/', function(req, res) {
    models.Comment.createNewCommentAndPushToPost(req.user._id,
                                                 req.body.postId,
                                                 req.body.text,
                                                 function(err, comment) {
                                                     console.log('created comment')
                                                     return res.json({comment: comment})
                                                 })
});

router.post('/update-post/', function(req, res) {
    models.Post.updatePost(req.user._id,
                           req.body.post,
                           function(err, post) {
                               if(err) {
                                   console.log(err)
                                   return res.sendStatus(500)
                               }
                              return res.json(post)
                           })
});

router.post('/update-comment/', function(req, res) {
    models.Comment.updateComment(req.user._id,
        req.body.comment,
        function(err) {
            if(err) {
                console.log(err)
                return res.sendStatus(500)
            }
            return res.sendStatus(200)
        })
});

router.post('/delete-post/', function(req, res) {
    console.log('DELETE POST')
    models.Post.deletePost(req.user._id, req.body.postId, function(err) {
        console.log(err)
        if(err) {
            return res.sendStatus(500)
        }
        else {
            console.log('returned 200')
            return res.sendStatus(200)
        }
    })
})

router.post('/update-solved-status/', function(req, res) {
    models.Post.updateSolvedStatus(req.user._id,
                                   req.body.postId,
                                   req.body.solved,
                                   function(err) {
                                       console.log(err)
                                       if(err)
                                           return res.sendStatus(500)
                                       else
                                            return res.sendStatus(200)
                                   })
});

router.get('/get-categories-and-number-of-related-posts/', function(req, res) {
    models.Post.aggregate({$group: {_id: '$category.name', count: {$sum: 1}}}, function(err, result) {
        return res.json(result)
    })
})

router.get('/get-tags-and-number-of-related-posts/', function(req, res) {
    var map = function() {
        var tags = this.tags
        for(var tag in tags) {
            emit(tags[tag].name, {sum: 1})
        }
    }

    var reduce = function(id, arr) {
        var sum = 0
        for(var i=0; i < arr.length; i++) {
            sum += arr[i].sum
        }
        return { sum: sum }
    }
    models.Post.mapReduce({map: map, reduce: reduce}, function(err, results) {
        if(err) {
            return res.sendStatus(500)
        }
        else {
            return res.json(results)
        }
    })
})

module.exports = router;