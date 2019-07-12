var express = require('express');
var cors = require('cors')
var app = express();

var mongoose = require('mongoose');


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

// on 3000
app.listen(3000, function () {
  console.log('listening on 3000');
})
