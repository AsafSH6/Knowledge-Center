var index = -1
function getRelevantMessages(messages) {
    // months and days starts from 0
    if(index == -1)
        var today = new Date() // TODAY
////            ** TEST CASES **
//    else if(index  == 0)
//        var today = new Date(2016, 6, 4, 7) // case A
//    else if(index == 1)
//        var today = new Date(2016, 2, 16, 15) // case B
//    else if(index == 2)
//        var today = new Date(2016, 4, 1, 17) // case C
//    else if(index == 3)
//        var today = new Date(2016, 3, 11, 18) // case D and E
//    else if(index == 4)
//        var today = new Date(2016, 3, 4, 2) // case E
//    else if(index == 5)
//        var today = new Date(2016, 2, 16, 14) // case A and B


    var relevantMessagesArray = new Array()
    for(var message in messages) {
        var displayTime = messages[message].displayTime
        for(var time in displayTime) {
            var beginDate = new Date(displayTime[time].dates.begin);
            var endDate = new Date(displayTime[time].dates.end);

            if((today >= beginDate && today <= endDate) && ($.inArray(today.getDay(), displayTime[time].days) != -1) && (today.getHours() >= displayTime[time].hours.begin && today.getHours() <= displayTime[time].hours.end)){
                relevantMessagesArray.push(messages[message])
            }
        }
    }
    return relevantMessagesArray
}

function loadAndFormatTemplate(message) {
    $("#template").load(message.template, function(responseTxt, statusTxt, xhr){
        var lines = message.text
        var line
        for(line in lines) {
            $("#" + line).html(lines[line])
            $("#" + line).show()
        }

        var images = message.images
        for(var image in images) {
            $("#" + image).attr("src", images[image])
            $("#" + image).show()
        }
    })
}

function getScreenId() {
    var screenId = window.location.href.split('screen_id=')[1]
    return screenId != undefined ? screenId : 1;
}

$(document).ready(function() {
    var relevantMessagesArray = []
    var message
    var screenId = getScreenId()
    window.messages = [] // global
    function timingFunction() {
        if (relevantMessagesArray.length == 0) {
            relevantMessagesArray = getRelevantMessages(messages)
        }
        message = relevantMessagesArray.pop()
        loadAndFormatTemplate(message)
        window.setTimeout(timingFunction, message.durationInSeconds * 1000)
    }
    function loadMessages(callback) {
        $.getJSON('./screen_json/' + screenId, function(messages) {
            callback(messages)
        })
    }
    loadMessages(function(messages) {
        window.messages = messages
        // set interval every 3 minutes
        window.setInterval(loadMessages, 180000, function(messages){  // passing the function as callback to loadMessages - DOES NOT WORK WITH IE!!
            console.log('reloading messages')
            window.messages = messages
        })
        timingFunction()
    })
})
