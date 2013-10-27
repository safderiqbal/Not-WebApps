
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
    // Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
    var random_func = function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    if (req.body.translator == 'random') {
        var random = random_func(0,translators.available.length);
        var random_translator = translators.available[random];
        translators[random_translator](req.body.text, callback);
    }
    else {
        translators[req.body.translator](req.body.text, callback);
    }
}