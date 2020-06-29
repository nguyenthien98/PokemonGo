//models/Mission.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var giftSchema = new Schema({
  name: String,
  amount: Number
});

var missionSchema = new Schema({
  name: String,
  dateCreated: { type: Date, default: Date.now },
  gifts: [giftSchema]
});

module.exports = mongoose.model('Mission', missionSchema);