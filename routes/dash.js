var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req ,res) {
    var id = req.query.id
    res.render('dash', {
      device : id
    });
});

module.exports = router;