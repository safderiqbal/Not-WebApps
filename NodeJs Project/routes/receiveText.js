var clockworkService = require('./../classes/clockworkService');
var translators = require('./../classes/translators');
var sessions = require('./../classes/sessions');

exports.receive = function(req, res) {
    console.log(req.body.from);
    console.log(req.body.content);

    var raw = req.body.content;
    var sepIndex = raw.indexOf(":");
    var target;

    if (sepIndex > 0) {
        target = raw.slice(0, sepIndex);
        sessions.addSession(req.body.from, target);
    }
    else{
        target = sessions.getSessionByNumber(req.body.from);
    }

    if(target === undefined){
        target = req.body.from;
    }

    var callback = function (response){
        clockworkService.send({
            toNumber: target,
            fromNumber: req.body.from,
            content: response
        });
    };

    var random = random_func(0, translators.available.length);
    var random_translator = translators.available[random];
    translators[random_translator](req.body.content.slice(sepIndex + 1), callback);

    res.end();
};