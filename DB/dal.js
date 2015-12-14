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

            getAllMessages(function(messages) {
                if(messages.length != 5) {
                    var messages = require('./messages.js')
                    insertListOfMessages(messages, function(message){console.log('inserted: ' + message.name)})
                }
            })
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

function getAllMessages(callback) {
    dal.find().toArray(function(err, messages) {
        if(err != null) {
            console.log('error')
            console.log(err)
            return false;
        }
        else {
            callback(messages)
        }
    })
}

function getMessagesByScreenId(screenId, callback) {
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

function insertListOfMessages(messages, callback) {
    for(var message in messages) {
        var m = messages[message]
        insertNewMessage(m.name, m.screenIds, m.text, m.images, m.template, m.durationInSeconds, m.displayTime, callback)
    }
}

module.exports.Dal = {
                        getAllMessages: getAllMessages,
                        getMessagesByScreenId: getMessagesByScreenId,
                        insertNewMessage: insertNewMessage,
                        insertListOfMessages:insertListOfMessages
                     }
