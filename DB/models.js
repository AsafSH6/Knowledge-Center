var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hoursSchema = mongoose.Schema({
    begin: Number,
    end: Number
})

var dateSchema = mongoose.Schema({
    begin: Date,
    end: Date
})

var timeSchema = mongoose.Schema({
    dates: dateSchema,
    days: Array,
    hours: hoursSchema
})

var messageSchema = mongoose.Schema({
    name: String,
    screenIds: Array,
    text: Array,
    images: Array,
    template: String,
    durationInSeconds: Number,
    displayTime: [timeSchema]
})

module.exports.Message = mongoose.model('Message', messageSchema, 'messages')