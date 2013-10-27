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

    var random_func = function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
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

    translators.random(message.slice(sepIndex + 1), callback);

    res.end();
};