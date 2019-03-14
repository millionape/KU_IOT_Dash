var express = require('express');
var router = express.Router();
var request = require('request');
/* GET users listing. */
router.get('/', function(req ,res) {
    var id = req.query.id
    console.log(id);
    res.render('dash', {
      device : id
    });
});
router.get('/getdata', function(req ,res) {
  var _gid = req.query.gid
  var _id = req.query.id
  request('http://119.59.116.171:8080/values?id='+_id+'&gid='+_gid+'&limit=1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log(body) // Show the HTML for the Google homepage. 
      res.send(body);
    }
  });
});


module.exports = router;