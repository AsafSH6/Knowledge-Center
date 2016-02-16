var express = require('express');
var models = require('../DB/models')
var router = express.Router();

module.exports = function(socketIO) {

    router.get('/get-all-categories/', function (req, res) {
        models.Category.findAllCategories(function (err, categories) {
            if (!err) {
                res.status(200).json(categories)
            }
            else {
                res.status(500)
            }
        })
    });

    router.get('/get-all-tags/', function (req, res) {
        models.Tag.getAllTags(function (err, tags) {
            if (!err) {
                res.status(200).json(tags)
            }
            else {
                res.status(500)
            }
        })
    });

    router.get('/get-all-addresses/', function(req, res) {
        models.User.getAddress(function(addr) {
            console.log(addr);
            res.json(addr);
        })
    });

    router.get('/get-home-posts/', function(req, res) {
        models.Post.getPostsHomePage(function(posts) {
            console.log(posts);
            res.json(posts);
        })
    });


    router.post('/delete-tag/', function (req, res) {
        models.Tag.removeTags(req.body.tagId, function (err) {
            if (!err) {
                res.sendStatus(200)

            }
            else {
                res.sendStatus(500)
            }
        })
    })

    router.post('/add-tag/', function (req, res) {
        models.Tag.createNewTag(req.body.tagName, function (err, tag) {
            if (!err) {
                res.status(200).json(tag)
            }
            else {
                res.sendStatus(500)
            }
        })
    })


    router.get('/get-all-users/', function (req, res) {
        models.User.getAllUsersAdmin(function (err, users) {
            if (!err) {
                res.status(200).json(users)
            }
            else {
                res.sendStatus(500)
            }
        })
    });

    router.get('/get-all-posts-filtered-by-category/:category', function (req, res) {
        console.log(req.params['category'])
        models.Post.findAllPostsFilteredByCategory(req.params['category'], function (err, posts) {
            if (!err) {
                res.status(200).json(posts)
            }
            else {
                res.sendStatus(500)

            }
        })
    });

    router.get('/get-all-tags-filtered-by-category/:category', function (req, res) {
        console.log(req.params['category'])
        models.Tag.findAllTagsFilteredByCategory(req.params['category'], function (err, tags) {
            if (!err) {
                res.status(200).json(tags)
            }
            else {
                res.sendStatus(500)
            }
        })
    });
    router.get('/get-post-by-id/:id', function (req, res) {
        console.log(req.params['id'])
        models.Post.findPostById(req.params['id'], function (err, post) {
            if (!err) {
                res.status(200).json(post)
            }
            else {
                res.sendStatus(500)
            }

        })
    });


    router.get('/increase-view-by-one/:id', function (req, res) {
        models.Post.findPostById(req.params['id'], function (err, post) {
            if (!err) {
                post.increasePostViewByOne(function () {
                    res.sendStatus(200)
                })
            }
            else {
                res.sendStatus(500)
            }
        })
    });

    router.post('/create-new-post/', function (req, res) {
        models.Post.createNewPost(req.user._id,
            req.body.category,
            req.body.tags,
            req.body.title,
            req.body.text,
            function (err, post) {
                if (!err) {
                    socketIO.sockets.emit(req.body.category, post)
                    res.status(200).json(post)
                }
                else {
                    res.sendStatus(500)
                }
            })
    });

    router.post('/create-new-comment/', function (req, res) {
        models.Comment.createNewCommentAndPushToPost(req.user._id,
            req.body.postId,
            req.body.text,
            function (err, comment) {
                if (!err) {
                    socketIO.sockets.emit(req.body.postId, comment)
                    res.status(200).json(comment)
                }
                else {
                    res.sendStatus(500)
                }

            })
    });

    router.post('/update-post/', function (req, res) {
        models.Post.updatePost(req.user._id,
            req.body.post,
            function (err, post) {
                if (!err) {
                    return res.status(200).json(post)
                }
                else {
                    res.sendStatus(500)
                }

            })
    });

    router.post('/update-comment/', function (req, res) {
        models.Comment.updateComment(req.user._id,
            req.body.comment,
            function (err) {
                if (!err) {
                    res.sendStatus(200)
                }
                else {
                    res.sendStatus(500)
                }

            })
    });

    router.post('/update-user-admin/', function(req, res) {
        models.User.updateUserAdmin(req.body.username,
            req.body.password, req.body.email, req.body.userId,
            function(err) {
                if(err) {
                    console.log(err)
                    return res.sendStatus(500)
                }
                return res.sendStatus(200)
            })
    });


    router.post('/delete-post/', function (req, res) {
        console.log('DELETE POST')
        models.Post.deletePost(req.user._id, req.body.postId, function (err) {
            if (!err) {
                res.sendStatus(200)
            }
            else {
                return res.sendStatus(500)
            }
        })
    })

    router.post('/delete-comment/', function (req, res) {
        console.log('DELETE COMMENT')
        models.Comment.deleteComment(req.user._id, req.body.commentId, function (err) {
            if (!err) {
                socketIO.sockets.emit('comment-' + req.body.postId, req.body.commentId)
                return res.sendStatus(200)
            }
            else {
                return res.sendStatus(500)
            }
        })
    })

    router.post('/search/', function (req, res) {
        console.log('SEARCH')
        console.log(req.body)
        models.Post.search(req.body, function (err, posts) {
            if (!err) {
                return res.status(200).json(posts)
            }
            else {
                return res.status(500)
            }

        })
    })

    router.post('/update-solved-status/', function (req, res) {
        models.Post.updateSolvedStatus(req.user._id,
            req.body.postId,
            req.body.solved,
            function (err) {
                if (!err) {
                    res.sendStatus(200)
                }
                else {
                    res.sendStatus(500)
                }
            })
    });

    router.get('/get-categories-and-number-of-related-posts/', function (req, res) {
        models.Post.aggregate({$group: {_id: '$category.name', count: {$sum: 1}}}, function (err, result) {
            if (!err) {
                res.status(200).json(result)
            }
            else {
                res.sendStatus(500)
            }
        })
    })

    router.get('/get-tags-and-number-of-related-posts/', function (req, res) {
        var map = function () {
            var tags = this.tags
            for (var tag in tags) {
                emit(tags[tag].name, {sum: 1})
            }
        }

        var reduce = function (id, arr) {
            var sum = 0
            for (var i = 0; i < arr.length; i++) {
                sum += arr[i].sum
            }
            return {sum: sum}
        }
        models.Post.mapReduce({map: map, reduce: reduce}, function (err, results) {
            if (!err) {
                res.status(200).json(results)
            }
            else {
                res.status(500)
            }
        })
    })

    router.get('/get-all-images/', function (req, res) {
        models.Image.findAllImages(function (err, images) {
            if (err) {
                res.sendStatus(500)
            }
            else {
                res.status(200).json(images)
            }
        })
    })
    return router
}