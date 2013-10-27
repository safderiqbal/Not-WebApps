
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

    translators.pirate(req.body.text, function() {});
    translators.yoda(req.body.text, function() {});
    translators.ermahgerd(req.body.text, final);
}