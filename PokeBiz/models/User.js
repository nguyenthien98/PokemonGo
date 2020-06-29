//models/User.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pokemonSchema = new Schema({
  name: String,
  type: String,
  level: { type: Number },
  cpp: { type: Number },
  imageURL: String,
  levelStage2: Number,
  levelStage3: Number,
  stage: String,
  imgStage2: String,
  imgStage3: String,
  imgEvolState2: String,
  imgEvolState3: String,
  dateCatched: { type: Date, default: Date.now }
});

var pokedexSchema = new Schema({
  imageURL: String,
  type: String,       // Kanto, Johto, Hoenn, Sinnoh
  dateAdded: { type: Date, default: Date.now }
});

var friendSchema = new Schema({
  username: String,
  dateMakedFriend: { type: Date, default: Date.now }
});

var friendRequestReceivedSchema = new Schema({
  username: String,
  dateReceivedRequest: { type: Date, default: Date.now }
});

var friendRequestSentSchema = new Schema({
  username: String,
  dateSendRequest: { type: Date, default: Date.now }
});

var giftSchema = new Schema({
  sender: String      // username
});

var itemSchema = new Schema({
  name: String,
  amount: Number,
  imageURL: String,
  dateCatched: { type: Date, default: Date.now }
});

var userSchema = new Schema({
  username: String,
  passwordHash: String,
  phoneNumber: String,
  email: String,
  role: { type: Number, default: 0 },
  level: Number,
  exp: Number,
  expNewLevel: Number,
  dateJoined: { type: Date, default: Date.now },
  imageURL: String,
  pokeGo: String,
  coins: Number,
  pokemons: [pokemonSchema],
  pokedex: [pokedexSchema],
  friends: [friendSchema],
  friendRequestReceived: [friendRequestReceivedSchema],
  friendRequestSent: [friendRequestSentSchema],
  balls: Number,
  gifts: [giftSchema],
  items: [itemSchema]
});

module.exports = mongoose.model('User', userSchema);