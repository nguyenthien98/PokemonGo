var express = require('express');
var app = express();

var server = require('http').createServer(app);

var io = require('socket.io')(server);

app.get('/', function(req,res,ext){
    res.sendfile(__dirname + "/public/index.html");
});

app.use(express.static('public'));

io.on('connect', function(client){
    console.log('Client connected...');

    client.on('join', function(data){
        console.log(data);
    });

    client.on('messages', function(data){
        client.emit('thread', data);
        client.broadcast.emit('thread', data);
    });
});

server.listen(8000);