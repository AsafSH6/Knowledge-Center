//var models = require('./models');
var MongoClient = require('mongodb').MongoClient;
var dbConfig = require('./config');
var __db = null;
var dal = null;

module.exports.Connect = function() {
    MongoClient.connect(dbConfig.url, function(err, db){
        if (err!=null) {
            console.log('connection error')
            console.log(err)
        }
        else {
            console.log('connected')
            __db = db
            dal = __db.collection('messages')
        }
    });
}

module.exports.Disconnect = function() {
    __db.close(function(err) {
        if(err != null) {
            console.log('error disconnecting db')
            console.log(err)
        }
        else {
            console.log('disconnected');
        }
    });
}

function getMessagesByScreenId(screenId, callback){
    dal.find({screenIds: screenId}).toArray(function(err, messages) {
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
    dal.insertOne({
        name: name,
        screenIds: screenIds,
        text: text,
        images: images,
        template: template,
        durationInSeconds: durationInSeconds,
        displayTime: displayTime
    }, function(err, message) {
        if (err) {
            console.log("error: couldn't save the message");
            return false;
        }
        else {
            callback(message)
        }
    })

}

module.exports.Dal = {
                        getMessagesByScreenId: getMessagesByScreenId,
                        insertNewMessage: insertNewMessage
                     }
