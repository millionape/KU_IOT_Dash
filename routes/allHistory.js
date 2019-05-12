var express = require('express');
var router = express.Router();
var request = require('request');
/* GET users listing. */
router.get('/', function(req ,res) {
    var numberOfQuery = req.query.queryNumber
    var nid = req.query.nid
    var gid = req.query.gid
    // var id = req.query.id
    // var nid_1 = req.query.nid_1
    // var nid_2 = req.query.nid_2
    // console.log(id);
    request('http://119.59.116.171:8080/values?id='+nid+'&gid='+gid+'&limit='+numberOfQuery, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(body); // you missed that...
            label = [];
            dataTemp = [];
            dataAir =[];
            for(var i = 0; i < data.length; i++) {
                //label.push(data[i].dt.toString());
                //var thTime = new Date(data[i].dt)
                label.push("'"+new Date(data[i].dt)+"'");
                //console.log(JSON.stringify(data[i]["airTemp"]));
            }
            //console.log(dataArr);
          //console.log(body) // Show the HTML for the Google homepage. 
          res.render('nodeAllHistory',{
            jsonData : data,
            labelArr : label,
            nid : nid,
            gid : gid
          });
        }
      });
    // res.render('nodeAllHistory', {
    //     gatewayID : gid,
    //     queryNumber : numberOfQuery,
    //     nodeID : nid
    // });
    //res.send(nid);
});
// router.get('/getdata', function(req ,res) {
//   var _gid = req.query.gid
//   var _id = req.query.id
//   request('http://119.59.116.171:8080/values?id='+_id+'&gid='+_gid+'&limit=1', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       //console.log(body) // Show the HTML for the Google homepage. 
//       res.send(body);
//     }
//   });
// });


module.exports = router;