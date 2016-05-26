var app = require('./app')

app.listen(app.get('port'), 'localhost', function(){
    var host = app.address().address
    var port = app.address().port

    console.log("Final Project app listening at http://%s:%s", host, port)
})