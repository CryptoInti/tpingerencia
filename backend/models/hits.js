var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Hits = mongoose.model('Hits', Schema);

var HitsSchema = new mongoose.Schema({
  created_at: {
    type: Date
  },
  title: {
    type: String
  },
  url: {
    type: String
  },
  author: {
    type: String
  },
  story_id: {
    type: Number
  },
  story_title: {
    type: String
  },
  story_url: {
    type: String
  },
  parent_id: {
    type: Number
  },
  created_at_i: {
    type: Number
  },
  is_delete: {
    type: Boolean
  }
});

var Hits = mongoose.model('Hits', HitsSchema, 'Hits');
module.exports = Hits;
