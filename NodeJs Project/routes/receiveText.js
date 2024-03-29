var clockworkService = require('./../classes/clockworkService');
var translators = require('./../classes/translators');
var sessions = require('./../classes/sessions');

exports.receive = function(req, res) {
    var to,
        from = req.body.from,
        message = req.body.content;

    var raw = req.body.content;
    var sepIndex = raw.indexOf("|");
    
    console.log(from);
    console.log(message);

    if (sepIndex > 0) {
        to = raw.slice(0, sepIndex);
        sessions.addSession(from, to);
    }
    else{
        to = sessions.getSessionByNumber(from);
    }

    if(to === undefined){
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