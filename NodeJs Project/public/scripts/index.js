// initialize socket
(function () {
    var messageHtml = function (sender, message) {
        return '<div class="row"><div class="col-sm-4">' + sender + '</div><div class="col-sm-8">' + message + '</div></div>';
    }

    var errorHtml = function (sender, message) {
        return '<div class="row error"><div class="col-sm-4">' + sender + '</div><div class="col-sm-8">' + message + '</div></div>';
    }
    var messages = $('#messages');
    var sessionId = $('#sessionId').val();

    var socket = io.connect('/');

    socket.on('confirm', function (data) {
        console.log('Socket Event Confirm');
        socket.emit('register', { sessionId: sessionId });
    })

    socket.on('message', function (data) {
        console.log('Socket Event Message');
        messages.append(messageHtml(data.sender, data.message));
    });

    socket.on('error', function (data) {
        console.log('Socket Event Error');
        messages.append(errorHtml(data.sender, data.message));
    });

    $('#submit').click(function () {
        var to = $('#to').val(),
            from = $('#sessionId').val(),
            text = $('#text').val(),
            translator = $('input[name=translator]:checked').val()

        socket.emit('receive', {
            from: from,
            to: to,
            text: text,
            translator: translator
        })
    });
}())