var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports.isAuthenticated = isAuthenticated

module.exports = function(passport, socketIO){

    /* Handle Login POST */
    router.post('/login/', passport.authenticate('login'), function(req, res) {
        socketIO.sockets.emit('user-connected', req.user._id)
        res.status(200).json({id: req.user._id})
    })

    router.post('/login/admin/', passport.authenticate('login'), function(req, res) {
        if(req.user.is_admin){
            console.log(req.user.is_admin)
            res.status(200).json({id: req.user._id})
        }
        else {
            req.logout()
            res.sendStatus(500)
        }
    })

    /* Handle Registration POST */
    router.post('/signup/', passport.authenticate('signup'), function(req, res) {
            res.status(200).json({id: req.user._id})
    });

    /* Handle Logout */
    router.get('/signout/', function(req, res) {
        socketIO.sockets.emit('user-disconnected', req.user._id)
        req.logout();
        res.sendStatus(200)
    });

    router.get('/is-authenticated/', function(req, res) {
        console.log(req.isAuthenticated())
        res.json({isAuthenticated: req.isAuthenticated()})
    })

    return router;
}