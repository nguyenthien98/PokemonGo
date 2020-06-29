var socket = io.connect('localhost:8200');
socket.on('connect', function (data) {
    socket.emit('join', 'Hello server from client');
});

//listen thread event
socket.on('thread', function (data) {
    $('#thread').append('<li>' + data + '</li>')
});

$('form').submit(function(){
    var message = $('#message').val();
    socket.emit('messages',message);
    this.reset();

    return false;
});