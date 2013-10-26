
/*
 * POST send text.
 */
var clockworkService = require('./clockworkService');
var translators = require('./translators');

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

    translators.pirate(req.body.text, callback);
}