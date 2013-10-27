
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
    var clients = Object.keys(sockets), i = 0, ln = clients.length;

    for (;i < ln; i++) {
        sendToSession(clients[i], sender, message);
    }

}

var send = function (client, sender,  message) {
    client.emit('message', { sender: sender , message: message });
}

var sendToSession = function (sessionId, sender, message) {
    var client = sockets[sessionId];
    send(client, sender, message);
}

var getSessionId = function () {
    maxSessionId++;
    return '555-' + maxSessionId;
}


exports.connection = connection;

exports.broadcast = broadcast;

exports.send = send;

exports.sendToSession = sendToSession;

exports.getSessionId = getSessionId;