var express = require('express');
var router = express.Router();
var request = require('request');
/* GET users listing. */
// router.get('/', function(req ,res) {
//     console.log(id);
//     res.render('dash', {
//       device : id,
//       node1 : nid_1,
//       node2 : nid_2
//     });
// });
router.get('/get', function(req ,res) {
  var _gid = req.query.gid
  var _id = req.query.id
  var _limit = req.query.limit
  var _labelTxt = req.query.label
  var _prefix = req.query.prefix
  var chartMin = req.query.chartMin
  var chartMax = req.query.chartMax
  request('http://119.59.116.171:8080/values?id='+_id+'&gid='+_gid+'&limit='+_limit, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        data = JSON.parse(body); // you missed that...
        label = [];
        dataArr = [];
        for(var i = 0; i < data.length; i++) {
            //label.push(data[i].dt.toString());
            //var thTime = new Date(data[i].dt)
            label.push("'"+new Date(data[i].dt)+"'");
            dataArr.push(data[i][_prefix]);
            //console.log(JSON.stringify(airTempArr));
        }
        console.log(dataArr);
      //console.log(body) // Show the HTML for the Google homepage. 
      res.render('historyChart',{
        dataArr : dataArr,
        labelArr : label,
        labelTxt : _labelTxt,
        chartMin : chartMin,
        chartMax : chartMax
      });
    }
  });
});
router.get('/get/pm', function(req ,res) {
    var _gid = req.query.gid
    var _id = req.query.id
    var _limit = req.query.limit
    var _labelTxt = req.query.label
    var _chartmax = req.query.chartmax
    request('http://119.59.116.171:8080/values?id='+_id+'&gid='+_gid+'&limit='+_limit, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          data = JSON.parse(body); // you missed that...
          label = [];
          pm1Arr = [];
          pm25Arr = [];
          pm10Arr = [];
          for(var i = 0; i < data.length; i++) {
              //label.push(data[i].dt.toString());
              //var thTime = new Date(data[i].dt)
              label.push("'"+new Date(data[i].dt).toISOString()+"'");
              pm1Arr.push(data[i].pm1);
              pm25Arr.push(data[i].pm25);
              pm10Arr.push(data[i].pm10);
              //console.log(JSON.stringify(airTempArr));
          }
          //console.log(dataArr);
        //console.log(body) // Show the HTML for the Google homepage. 
        res.render('historyChartPM',{
            pm1 : pm1Arr,
            pm25 : pm25Arr,
            pm10 : pm10Arr,
            labelTxt : _labelTxt,
            labelArr : label,
            chartmax : _chartmax
        });
      }
    });
  });
module.exports = router;