$('#submit').click(function () {
    var to = $('#to').val(),
        from = $('#sessionId').val(),
        text = $('#text').val(),
        translator = $('input[name=translator]:checked').val()

    $.ajax({
        url: 'sendtext',
        dataType: 'json',
        type: 'POST',
        data: {
            from: from,
            to: to,
            text: text,
            translator: translator
        }
    })
});


// initialize socket
(function () {
    var messageHtml = function (sender, message) {
        return '<div class="row"><div class="col-sm-4">' + sender + '</div><div class="col-sm-8">' + message + '</div></div>';
    }
    var messages = $('#messages');
    var sessionId = $('#sessionId').val();

    var socket = io.connect('/');

    socket.emit('registerSession', { sessionId: sessionId });

    socket.on('message', function (data) {
        messages.append(messageHtml(data.sender, data.message));
    });
}())