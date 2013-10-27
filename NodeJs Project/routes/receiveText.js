var clockworkService = require('./../classes/clockworkService');
var translators = require('./../classes/translators');
var sessions = require('./../classes/sessions');

exports.receive = function(req, res) {
    var to,
        from = req.body.from,
        message = req.body.content;

    var raw = req.body.content;
    var sepIndex = raw.indexOf(":");
    var target;
    
    console.log(from);
    console.log(message);

    if (sepIndex > 0) {
        to = raw.slice(0, sepIndex);
        sessions.addSession(from, to);
    }
    else{
        to = sessions.getSessionByNumber(from);
    }

    if(target === undefined){
        to = req.body.from;
    }

    var callback = function (response){
        clockworkService.send({
            toNumber: to,
            fromNumber: from,
            content: response
        });
    };

    var random = random_func(0, translators.available.length);
    var random_translator = translators.available[random];
    translators[random_translator](message.slice(sepIndex + 1), callback);

    res.end();
};