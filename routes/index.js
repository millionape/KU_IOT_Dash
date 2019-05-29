var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */

router.get('/', function(req ,res) {
  var _gid83 = 83
  var _id31 = 31
  var _gid = 55
  var _id = 51
  try{
    request('http://119.59.116.183:8080/values?id='+_id+'&gid='+_gid+'&limit=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body);
        //console.log(body) // Show the HTML for the Google homepage. 
        var thTime = data[0].dt.toLocaleString("en-US", {timeZone: "asia/bangkok"});
        request('http://119.59.116.183:8080/values?id='+_id31+'&gid='+_gid83+'&limit=1', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            data = JSON.parse(body);
            //console.log(body) // Show the HTML for the Google homepage. 
            var thTime2 = data[0].dt.toLocaleString("en-US", {timeZone: "asia/bangkok"});
            res.render('home',{lastUpdate : new Date(thTime) , lastUpdate2 : new Date(thTime2)});
          }
        });
        //res.render('home',{lastUpdate : new Date(thTime) , lastUpdate2 : new Date()});
      }
    });
  }catch(err){
    res.render('home',{lastUpdate : "ERROR!!!!" });
  }
});

module.exports = router;
