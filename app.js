var http = require('http');
var socketIO = require('socket.io')
var express = require('express');
var expressSession = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dbConfig = require('./DB/config');

//mongoose.connect(dbConfig.local_url, function(err) {
mongoose.connect(dbConfig.remote_url, function(err) {
    if(err!=null) {
        console.log('connection error')
    }
    else {
        console.log('connected')
    }
});

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({ secret: 'mySecretKey', cookie: { maxAge: 60000000000 }, resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./passport/init')(passport);

// routers
app.use('/', require('./routers/index'));
app.use('/auth', require('./routers/auth')(passport, io))
app.use('/api/v1', require('./routers/api')(io));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log('error')
    console.log(err.stack)
    res.status(err.status || 500);
    res.redirect('/#/error/')
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log('error')
        console.log(err.stack)
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

module.exports = server;