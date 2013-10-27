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

    socket.on('register', function (data) {
        console.log('Socket event register: ' + data.sessionId);
        sockets[data.sessionId] = socket;
        send(socket, 'System', 'Session registered')
    });

    socket.on('receive', receive);

    socket.emit('confirm');
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

function receive(data) {
    var from = data.from,
        to = data.to,
        message = data.text,
        translator = data.translator,
        available_array;

    console.log('Socket event receive');

    try {
        console.log("Socket received message: " + JSON.stringify(data));

        sessions.addSession(from, to);

        if (translator == 'random') {
            available_array = translators.available();
            var random = random_func(0, available_array.length);
            var random_translator = available_array[random];
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
            sendToSession(from, 'Sent To:' + to, message);
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

exports.error = error;

exports.errorToSession = errorToSession;

exports.getSessionId = getSessionId;

exports.SESSION_PREPEND = SESSION_PREPEND