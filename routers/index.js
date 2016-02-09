var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index.html');
});
router.get('/admin', function(req, res) {
    res.render('index-admin.html');
});
module.exports = router;
