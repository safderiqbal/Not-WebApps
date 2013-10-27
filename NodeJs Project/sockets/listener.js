var clockworkService = require('../classes/clockworkService');
var translators = require('../classes/translators');
var sessions = require('../classes/sessions');

var sockets = {};
var maxSessionId = 0;
var SESSION_PREPEND = '555-';

var getSessionId = function () {
    maxSessionId++;
    return SESSION_PREPEND + maxSessionId;
}

var connection = function (socket) {
    console.log('Socket connection')

    send(socket, 'System', 'Messaging socket connected');

    socket.on('register', function (data) {
        console.log('Socket registered from: ' + data.sessionId);
        sockets[data.sessionId] = socket;
        send(socket, 'System', 'Session registered')
    });

    socket.on('receive', receive);
}

var broadcast = function (sender, message) {
    var clients = Object.keys(sockets), i = 0, ln = clients.length;

    for (; i < ln; i++) {
        sendToSession(clients[i], sender, message);
    }
}

var send = function (client, sender, message) {
    client.emit('message', { sender: sender, message: message });
}

var sendToSession = function (sessionId, sender, message) {
    var client = getClientFromSessionId(sessionId);
    send(client, sender, message);
}

// Returns a random integer between min and max
var random_func = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var receive = function (data) {
    var from = data.from,
        to = data.to,
        message = data.text,
        translator = data.translator;

    try {

        console.log("Socket recieved message: " + JSON.stringify(data));

        sessions.addSession(from, to);

        if (translator == 'random') {
            var random = random_func(0, translators.available.length);
            var random_translator = translators.available[random];
            translators[random_translator](message, callback);
        }
        else {
            translators[translator](message, callback);
        }

        function callback(translatedMessage) {
            message = translatedMessage;
            clockworkService.send({
                toNumber: to,
                fromNumber: from,
                content: message,
                callback: final
            });
        }

        function final() {
            // log the message back to the client
            sendToSession(from, from, message);
        }
    } catch (e) {
        errorToSession(from, to, "Error occoured: " + e);
    }
}

var error = function (client, sender, message) {
    client.emit('error', { sender: sender, message: message });
}

var errorToSession = function (sessionId, sender, message) {
    var client = getClientFromSessionId(sessionId);
    send(client, sender, message);
}

var getClientFromSessionId = function (sessionId) {
    var client = sockets[sessionId];
    if (!client) {
        throw "Requested session was not found";
    }
    return client;
}

exports.connection = connection;

exports.broadcast = broadcast;

exports.send = send;

exports.sendToSession = sendToSession;

exports.getSessionId = getSessionId;

exports.SESSION_PREPEND = SESSION_PREPEND