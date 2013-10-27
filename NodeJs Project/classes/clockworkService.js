/**
 * Created by Simon on 26/10/13.
 */
var translator = require('./translators');
var sessions = require('./sessions');
var listener = require('../sockets/listener');

exports.send = function(req){
    var http = require('http'),
        request = require('request'),
        CLOCKWORK_SERVICE_URL = 'https://api.clockworksms.com/http/send.aspx',
        API_KEY = '028646a5dff4200dd4539102cb07e37413de2896',
        CLOCKWORK_NUMBER = '07860033160';

    if(req.toNumber.indexOf('555') === 0){
        listener.sendToSession(req.toNumber, req.fromNumber, req.content);
    }
    else {
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
            function (error) {
                errorToSession(req.fromNumber, 'system', error);
            }
        );
    }
};

