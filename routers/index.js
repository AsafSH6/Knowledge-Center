var express = require('express');
var messages = require('../DB/messages');
var router = express.Router();


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

router.get('/json/screen_id=:screen_id', function(req, res, next) {
    var screenId = parseInt(req.params['screen_id']);
    var relevantMessages = [];
    for(var message in messages)  {
        var screens = messages[message].screenIds
        if(screens.indexOf(screenId) != -1) {
            relevantMessages.push(messages[message])
        }
    }

    res.json(relevantMessages)
});

module.exports = router;
