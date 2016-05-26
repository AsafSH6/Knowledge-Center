var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {
    //res.sendFile(path.join(__dirname, '../views', 'index.html'));
    res.render('index.html', {port: process.env.PORT || 5000});
});

router.get('/admin/', function(req, res) {
    res.render('index-admin.html', {port: process.env.PORT || 5000});
});

router.get('/statistics/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'index-statistics.html'));
});
module.exports = router;
