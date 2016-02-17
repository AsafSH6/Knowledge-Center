var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/admin/', function(req, res) {
    console.log('ADMIN')
    res.sendFile(path.join(__dirname, '../views', 'index-admin.html'));
});

router.get('/statistics/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'index-statistics.html'));
});
module.exports = router;
