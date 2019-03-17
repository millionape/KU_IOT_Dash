var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */

router.get('/', function(req ,res) {
  var _gid = 55
  var _id = 5555
  request('http://119.59.116.171:8080/values?id='+_id+'&gid='+_gid+'&limit=1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      //console.log(body) // Show the HTML for the Google homepage. 
      res.render('home',{lastUpdate : data[0].dt});
    }
  });
});

module.exports = router;
