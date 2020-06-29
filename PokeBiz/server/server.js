//server/server.js

var express = require('express');
var router = require('./routes/routes.js');
var session = require('express-session');
var pokemonRoutes = require('./routes/pokemonRoutes.js');
// var ccRouter=require('./routes/cc');
var path = require('path');

var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var shopRouter = require('./routes/shop');
var friendRouter = require('./routes/friend');
var pokedexRouter = require('./routes/pokedex');
var itemRouter = require('./routes/item');
var giftRouter = require('./routes/gift');
var paypalRouter = require('./routes/paypal');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use(session({
    secret: 'ilovenguyen',
    resave: true,
    saveUninitialized: true
}));

const options = {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: 50, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};
mongoose.connect('mongodb://pokebiz:pokebiz1905@ds137605.mlab.com:37605/pokebiz', options);

app.use('/', router);
app.use('/shop', shopRouter);
app.use('/friends', friendRouter);
app.use('/pokedex', pokedexRouter);
app.use('/items', itemRouter);
app.use('/gifts', giftRouter);
app.use('/paypal', paypalRouter);


// Socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connect', function (client) {

    client.on('join', function (data) {
        console.log(data);
    });

    client.on('sendMessageToServer', function (message) {
        client.emit('broadcastMessage', message);
        client.broadcast.emit('broadcastMessage', message);
    });
});


app.use('/', router);
server.listen(process.env.PORT || 5000);

// End Socket.io

module.exports = app;