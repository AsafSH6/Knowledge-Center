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
   console.log(req.params['screen_id']);
    var screenId = req.params['screen_id'];
    var relevant_messages = [];
    for(var message in messages)  {
        var screens = messages[message].screenIds
        console.log(screens);
        if(screenId in screens) {
            relevant_messages.push(messages[message])
        }
    }
    console.log(relevant_messages)
    res.json(relevant_messages)
});

module.exports = router;
