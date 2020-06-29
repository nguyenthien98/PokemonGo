//models/Pokestop.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pokestopSchema = new Schema({
  name: String,
  coordinatesX: Number,
  coordinatesY: Number
});

module.exports = mongoose.model('Pokestop', pokestopSchema);