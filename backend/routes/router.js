var express = require('express');
var axios = require('axios');
var schedule = require('node-schedule');
var router = express.Router();

var hits = require('../Controllers/hits')

router.get('/', function (req, res, next) {
  res.send("LALAs");
});

router.get('/getfromapi', function (req, res, next) {
  var j = schedule.scheduleJob('1 * * * * *', function() {
    axios.get('http://hn.algolia.com/api/v1/search_by_date?query=nodejs')
    .then(response => {
      let dateTime = new Date();
      console.log("llama Api Hits a las :"+dateTime);
      //console.log("data: "+JSON.stringify(response.data,null,4));

      hits.insertHits(response.data, res, next);
    })
    .catch(error => {
      console.log(error);
    })
  })

});


router.get('/hits', hits.listHits);

//router.delete('/hits/:hitId', hits.deleteHit);

router.put('/hits/:hitsId', hits.updateHit);

module.exports = router;
