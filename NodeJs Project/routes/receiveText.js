/**
 * Created by Simon on 27/10/13.
 */

var clockworkService = require('./../classes/clockworkService');
var translators = require('./../classes/translators');
var sessions = require('./../classes/sessions');

exports.receive = function(req, res) {
    console.log(req.body.from);
    console.log(req.body.content);

    var translated = translator.pirate(req.body.content)

    var session = sessions.getSessionByToNumber(req.body.from);

    if (session.to !== undefined) {
        clockworkService.send({
            toNumber: session.to,
            content: translated
        });
    }
    else {
        // push to webservice
    }


    res.end();
};