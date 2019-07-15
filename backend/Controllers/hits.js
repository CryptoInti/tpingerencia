var mongoose = require('mongoose');
var Hits = require('../models/hits');

exports.insertHits = function(req, res, next) {
  var hitsData = req;
  var duplicated = 0;
  var inserted = 0;
  var count = 0;
  var dateTime = new Date();
  console.log("length: "+hitsData.hits.length);
  for (let item of hitsData.hits) {
    //console.log(item);
    //Se busca si existe el registro previamente.
    Hits.find({created_at_i:item.created_at_i}, function(err, doc) {
      if(doc.length == 0){
        //Volvermos a guardar el registro solo si no existe el created_at_i previamente
        item["is_delete"] = false;
        Hits.create(item, function (error, hits) {
          if (error) {
            return next(error);
          } else {
            inserted++;
            console.log("OK--save-->"+hits.created_at_i+", count("+inserted+")");
          }
        });
      } else {
        duplicated++;
        console.log("NO--duplicated-->"+item.created_at_i+", count("+duplicated+")");
      }
    })

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

}
