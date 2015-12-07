var express = require('express');
var router = express.Router();
var path = require('path');
var messages = require('../DB/messages');


router.get('/', function(req, res, next) {
   res.redirect('/screen_id=1');
});


/* GET home page. */
router.get('/screen_id=:screen_id', function(req, res, next) {
    var screenId = req.params.screen_id;
    if(screenId == undefined) {
        res.send("no screen id.");
    }
    else {
        res.sendFile(path.join(__dirname, '../views', 'index.html'));
    }
});

router.get('/screen_json/:screen_id', function(req, res, next) {
    var screenId = parseInt(req.params['screen_id']);
    var relevantMessages = [];
    for(var message in messages)  {
        var screens = messages[message].screenIds
        if(screens.indexOf(screenId) != -1) {
            console.log('sending: ' + messages[message].name)
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

module.exports = router;
