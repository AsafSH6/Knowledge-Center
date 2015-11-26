var app = require('./app');

var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port

    console.log("Task2 app listening at http://%s:%s", host, port)
})