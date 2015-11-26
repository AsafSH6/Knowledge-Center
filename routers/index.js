var express = require('express');
var messages = require('../messages');
var router = express.Router();

/* GET home page. */
router.get('/:screen_id*?', function(req, res, next) {
    var screenId = req.params.screen_id;
    console.log(screenId)
    var screenMessagesList = new Array();
    if(screenId == undefined) {
        console.log('screen is undefined');
        res.send("no screen id.");
    }
    else {
        for(var message in messages) {
            var screens = messages[message].screenIds;

            if(screens.indexOf(screenId) != -1) {
                screenMessagesList.push(message);
                console.log('pushed')
            }
        }
        console.log(screenMessagesList)
        console.log('screen: ' + screenId);
        res.render('index.html');
    }
});

module.exports = router;
