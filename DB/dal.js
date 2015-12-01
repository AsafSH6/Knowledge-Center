var models = require('./models');
var mongoose = require('mongoose');


function getMessagesByScreenId(screenId){
    models.Message.find({screenIds: screenId}, function(err, messages) {
        if(err != null) {
            console.log('error')
            return false
        }
        else {
            console.log('returned')
            return messages
        }
    })
}

function insertNewMessage(name, screenIds, text, images, template, durationInSeconds, displayTime) {
    var message = new models.Message({
        name: name,
        screenIds: screenIds,
        text: text,
        images: images,
        template: template,
        durationInSeconds: durationInSeconds,
        displayTime: displayTime
    })
    message.save(function(err) {
        if (err) {
            console.log("error: couldn't save the message");
            return false;
        }
        else {
            console.log("saved message: " + message);
            return message._id;
        }
    })
}

module.exports.getMessagesByScreenId = getMessagesByScreenId
module.exports.insertNewMessage = insertNewMessage
