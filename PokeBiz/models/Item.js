//models/Item.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: String,
  rate: Number,	// Tỷ lệ bắt trúng được tăng thêm
  price:String,
  description:String,
  type:String,
  imageURL:String
});

module.exports = mongoose.model('Item', itemSchema);
