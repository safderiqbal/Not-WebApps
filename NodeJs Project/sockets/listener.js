
var sockets = {};
var maxSessionId = 0;

var connection = function (socket) {
    console.log('Socket connection')

    send(socket, 'System', 'Messaging socket connected');
    socket.on('registerSession', function (data) {
        sockets[data.sessionId] = socket;
        send(socket, 'System', 'Session registered')
    });
}

var broadcast = function (sender, message) {
    // iterate sockets and do send
    // send(socket, sender, message);
}

var send = function (client, sender,  message) {
    client.emit('message', { sender: sender , message: message });
}

var getSessionId = function () {
    maxSessionId++;
    return '555-' + maxSessionId;
}


exports.connection = connection;

exports.broadcast = broadcast;

exports.send = send;

exports.getSessionId = getSessionId;