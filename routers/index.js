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

router.get('/screen_json/screen_id=:screen_id', function(req, res, next) {
    var screenId = parseInt(req.params['screen_id']);
    var relevantMessages = [];
    for(var message in messages)  {
        var screens = messages[message].screenIds
        if(screens.indexOf(screenId) != -1) {
            relevantMessages.push({
                name: messages[message].name,
                displayTime: messages[message].displayTime
            })
        }
    }
    console.log(relevantMessages)
    res.json(relevantMessages)
});

router.get('/message/message_name=:message_name', function(req, res, next) {
    var messageName = req.params['message_name']
    var message;
    for(var msg in messages) {
        if(messages[msg].name == messageName) {
            message = messages[msg]
            break;
        }
    }
    if(message != undefined) {
        res.json(message);
    }
    else {
        res.send('ERROR');
    }
});


module.exports = router;
