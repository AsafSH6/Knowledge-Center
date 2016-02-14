var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index.html');
});

router.get('/admin/', function(req, res) {
    console.log('ADMIN')
    res.render('index-admin.html');
});

router.get('/statistics/', function(req, res) {
    res.render('index-statistics.html');
});
module.exports = router;
