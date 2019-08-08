var express = require('express');
var router = express.Router();
var request = require('request');
/* GET users listing. */
router.get('/', function(req ,res) {
    var id = req.query.id
    var nid_1 = req.query.nid_1
    var nid_2 = req.query.nid_2
    console.log(id);
    res.render('dash', {
      device : id,
      node1 : nid_1,
      node2 : nid_2
    });
});
router.get('/getdata', function(req ,res) {
  var _gid = req.query.gid
  var _id = req.query.id
  request('http://119.59.125.170:8080/values?id='+_id+'&gid='+_gid+'&limit=1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log(body) // Show the HTML for the Google homepage. 
      res.send(body);
    }
  });
});


module.exports = router;