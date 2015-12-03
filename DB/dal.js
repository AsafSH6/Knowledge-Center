var models = require('./models');


function getMessagesByScreenId(screenId, callback){
    models.Message.find({screenIds: screenId}, function(err, messages) {
        if(err != null) {
            console.log('error')
            return false
        }
        else {
            callback(messages)
        }
    })
}

function insertNewMessage(name, screenIds, text, images, template, durationInSeconds, displayTime, callback) {
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
            callback(message)
        }
    })
}

module.exports.getMessagesByScreenId = getMessagesByScreenId
module.exports.insertNewMessage = insertNewMessage
