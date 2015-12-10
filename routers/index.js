var express = require('express');
var path = require('path');
var messages = require('../DB/messages');
var dal = require('../DB/dal').Dal;


var router = express.Router();


router.get('/', function(req, res, next) {
   res.redirect('/screen_id=1');
});

/* GET home page. */
router.get('/:screen_id=:screen_id', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/screen_json/:screen_id', function(req, res, next) {
    var screenId = parseInt(req.params['screen_id']);
    
    dal.getMessagesByScreenId(screenId, function (messages) {
        console.log('*** sending ***')
        for(var message in messages) {
            console.log(messages[message].name)
        }
        res.json(messages)
    })
});

// just for inserting messages from messages.js into DB
router.get('/insert_messages', function(req, res, next) {
    for(var message in messages) {
        var m = messages[message]
        dal.insertNewMessage(m.name, m.screenIds, m.text, m.images, m.template, m.durationInSeconds, m.displayTime, function(message){console.log('inserted: ' + m.name)})
    }
   res.send('done');
});


module.exports = router;
