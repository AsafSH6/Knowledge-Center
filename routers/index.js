var express = require('express');
var messages = require('../DB/messages');
var dal = require('../DB/dal');

var router = express.Router();


router.get('/', function(req, res, next) {
   res.redirect('/screen_id=1');
});

/* GET home page. */
router.get('/:screen_id=:screen_id', function(req, res, next) {
        res.render('index.html');
});

router.get('/screen_json/:screen_id', function(req, res, next) {
    var screenId = parseInt(req.params['screen_id']);
    console.log(screenId)
    dal.getMessagesByScreenId(screenId, function (messages) {
        console.log('*** sending ***')
        for(var message in messages) {
            console.log(messages[message].name)
        }
        res.json(messages)
    })
});

router.get('/insert_messages', function(req, res, next) {
    for(var message in messages) {
        var m = messages[message]
        //if(m.name == 'messageA') {
        console.log(m.name)
        dal.insertNewMessage(m.name, m.screenIds, m.text, m.images, m.template, m.durationInSeconds, m.displayTime, function(message){})
        //}
    }
   res.send('done');
});


module.exports = router;
