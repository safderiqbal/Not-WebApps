
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

    translators.pirate(req.body.text, callback);
    translators.ermahgerd(req.body.text, function() {});
    translators.yoda(req.body.text, function() {});
    translators.jive(req.body.text, function() {});
    translators.herdy(req.body.text, function() {});
    translators.piglatin(req.body.text, function() {});
    translators.valleygirls(req.body.text, function() {});
    translators.leetspeak(req.body.text, function(){});
}