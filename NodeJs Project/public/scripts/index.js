
$('#submit').click(function () {
    var to = $('#to').val(),
        from = $('#from').val(),
        text = $('#text').val();

    $.ajax({
        url: 'sendtext',
        dataType: 'json',
        type: 'POST',
        data: {
            from: from,
            to: to,
            text: text
        }
    })
});