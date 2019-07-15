var express = require('express');
var axios = require('axios');
var cors = require('cors')
var schedule = require('node-schedule');
var app = express();

var mongoose = require('mongoose');
var hits = require('./Controllers/hits')


mongoose.connect('mongodb://ingerencia:fullstack1@ds151007.mlab.com:51007/ptingerencia');
var db = mongoose.connection;

//manejo de errores de MongoDB
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
//alles gut
});

app.use(cors());
// routes
var routes = require('./routes/router');
app.use('/', routes);

var j = schedule.scheduleJob('1 * * * * *', function() {
  axios.get('http://hn.algolia.com/api/v1/search_by_date?query=nodejs')
  .then(response => {
    let dateTime = new Date();
    console.log("llama Api Hits a las :"+dateTime);
    //console.log("data: "+JSON.stringify(response.data,null,4));

    hits.insertHits(response.data, "", "");
  })
  .catch(error => {
    console.log(error);
  })
})
// on 3000
app.listen(3000, function () {
  console.log('listening on 3000');
})
