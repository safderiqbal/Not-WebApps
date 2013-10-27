
/*
 * POST send text.
 */
var clockworkService = require('./../classes/clockworkService');
var translators = require('./../classes/translators');

exports.send = function(req, res){

    var final = function () {
        res.send('success');
    }

    var callback = function (translatedMessage) {
        clockworkService.send({
            toNumber: req.body.to,
            content: translatedMessage,
            callback: final
        });
    }

    if (req.body.translator == 'random') {
        var random = Math.abs(Math.floor(1 - Math.random() * translators.available.length));
        var random_translator = translators.available[random];
        translators[random_translator](req.body.text, final);
    }
    else {
        translators[req.body.translator](req.body.text, final);
    }
}