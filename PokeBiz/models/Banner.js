//models/Banner.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bannerSchema = new Schema({
  name: String,
  imageURL:String,
  link:String,
  trang:Number,
  vitri:Number,
  amount: Number
 
});

module.exports = mongoose.model('Banner', bannerSchema);