var mongoose = require('mongoose');
var Hits = require('../models/hits');

exports.insertHits = function(req, res, next) {
  var hitsData = req;
var limit = 5;
var i = 0;
  for (let item of hitsData.hits) {
    //console.log(item);
    item["is_delete"] = false;
    Hits.create(item, function (error, hits) {
      if (error) {
        return next(error);
      } else {
        //res.send(hits);
      }
    });
    i++
    if(i == limit) break;
  }

}

exports.listHits =  function(req, res, next) {
  var condition = {"is_delete" : "false"}
  Hits.find(condition, function (err, doc) {
    res.send(doc);
  });
}

exports.deleteHit = function(req,res,next) {
  Hits.delete(function (err, doc) {
    console.log("deleting...");
    res.delete(doc);
  });
}

exports.updateHit = function(req,res,next) {
  var util = require('util');
  //console.log("req: "+util.inspect(req));

  console.log("params: "+JSON.stringify(req.params,null,4));
  //console.log("query: "+JSON.stringify(req.query,null,4));
  Hits.findByIdAndUpdate(req.params.hitsId, {$set: {"is_delete" : "true"}}, {useFindAndModify: false},
    function (err, hits) {
      if (err) return next(err);
      //res.send('Hit deleted.');
    });

  var condition = {"is_delete" : "false"}
  Hits.find(condition, function (err, doc) {
    res.send(doc);
  });

}
