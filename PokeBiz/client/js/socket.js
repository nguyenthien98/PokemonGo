var url = location.protocol + '//' + window.location.hostname + ':5000';
var socket = io.connect(url);

socket.on('connect', function (data) {
    socket.emit('join', 'New client with socket id: ' + socket.id);
});

// Notification to server: This pokemon was catched by user
function sendMessageToServer(message) {
    socket.emit('sendMessageToServer', message);
}

// broadcast message
socket.on('broadcastMessage', function (message) {

    console.log('receive broadcast');
    console.log(message);

    if (message != null) {

        var divId = $("#message-box");
        console.log('message');
        divId.empty();

        var result = '<div class="alert alert-info alert-success-style2 alert-st-bg1 message-box" style="bottom: unset;">'
            + '<i class="fa fa-volume-up edu-inform admin-check-pro admin-check-pro-clr1" aria-hidden="true"></i>'
            + '<p>'
            + '<marquee>' + message + '</marquee>'
            + '</p>'
            + '</div>';

        divId.append(result);

        setTimeout(function () {
            divId.empty();
        }, 10000);   // 5s
    }
}); 