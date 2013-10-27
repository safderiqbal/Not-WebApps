/**
 * Created by Simon on 26/10/13.
 */
var translator = require('./translators');
var sessions = require('./sessions');

exports.send = function(req){
    var http = require('http'),
        request = require('request'),
        CLOCKWORK_SERVICE_URL = 'https://api.clockworksms.com/http/send.aspx',
        API_KEY = '028646a5dff4200dd4539102cb07e37413de2896',
        CLOCKWORK_NUMBER = '07860033160',
        sessionId = sessions.addSession(req.fromNumber, req.toNumber);

    request.post(
        CLOCKWORK_SERVICE_URL,
        {
            form: {
                key: API_KEY,
                to: req.toNumber,
                content: req.content,
                from: CLOCKWORK_NUMBER
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('it works' + body);
            }
            else {
                console.log('damn' + error);
                console.log('damn' + response);
                console.log('damn' + body);
            }
        }
    );

    return sessionId;
};

