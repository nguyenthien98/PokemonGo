//models/Pokemon.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pokemonSchema = new Schema  ({
  name: String,
  type: String,
  rate: Number,		// Tỷ lệ bắt trúng
  imageURL: String,
  stage: String,
  imgStage2:String,
  imgStage3:String,
  imgEvolState2:String,
  imgEvolState3:String
});

module.exports = mongoose.model('Pokemon', pokemonSchema);