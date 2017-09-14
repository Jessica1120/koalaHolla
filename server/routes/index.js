var router = require('express').Router();
var path = require('path');

router.get('/', function(req, res) {
    var indexPath = path.join(_dirname, '../public/index.html');
    console.log(indexPath);
    res.sendFile(indexPath);
});

module.exports = router;