var express = require('express');
var router = express.Router();
var messages = require('../DB/messages');
var dal = require('../DB/dal');


router.get('/', function(req, res, next) {
   res.redirect('/screen_id=1');
});
//router.get('/insert_messages', function(req, res, next) {
//    for(var message in messages) {
//        var m = messages[message]
//        console.log(m.name)
//        dal.insertNewMessage(m.name, m.screenIds, m.text, m.images, m.template, m.durationInSeconds, m.displayTime)
//    }
//   res.send('done');
//});


/* GET home page. */
router.get('/:screen_id=:screen_id', function(req, res, next) {
        res.render('index.html');
});

router.get('/screen_json/screen_id', function(req, res, next) {
    console.log('screen json')
    var screenId = parseInt(req.params['screen_id']);
    console.log(screenId)
    dal.getMessagesByScreenId(screenId, function (messages) {
        console.log(messages)
        res.json(messages)
    })
});

router.get('/message/message_name', function(req, res, next) {
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
        res.send('ERROR');
    }
});


module.exports = router;
