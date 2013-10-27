
var connection = function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
}

var broadcast = function (message) {

}

var send = function (client, message) {

}


exports.connection = connection;

exports.broadcast = broadcast;

exports.send = send;