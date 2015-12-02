var express = require('express');
var router = express.Router();
var messages = require('../DB/messages');


router.get('/', function(req, res, next) {
   res.redirect('/screen_id=1');
});


/* GET home page. */
router.get('/:screen_id=:screen_id', function(req, res, next) {
    var screenId = req.params.screen_id;
    var screenMessagesList = new Array();
    if(screenId == undefined) {
        res.send("no screen id.");
    }
    else {
        for(var message in messages) {
            var screens = messages[message].screenIds;

            if(screens.indexOf(screenId) != -1) {
                screenMessagesList.push(message);
            }
        }
        res.render('index.html');
    }
});

router.get('/screen_json/:screen_id', function(req, res, next) {
    var screenId = parseInt(req.params['screen_id']);
    var relevantMessages = [];
    for(var message in messages)  {
        var screens = messages[message].screenIds
        if(screens.indexOf(screenId) != -1) {
            relevantMessages.push(messages[message])
        }
    }
    //console.log(relevantMessages)
    if(relevantMessages.length != 0) {
        res.json(relevantMessages)
    }
    else {
        res.json({error: 'ERROR ZERO MESSAGES FOUND'});
    }
});

router.get('/message/:message_name', function(req, res, next) {
    var messageName = req.params['message_name']
    var message;
    for(var message in messages) {
        if(messages[message].name == messageName) {
            message = messages[message]
            break;
        }
    }
    if(message != undefined) {
        res.json(message);
    }
    else {
        res.json({error: 'ERROR'});
    }
});


module.exports = router;
