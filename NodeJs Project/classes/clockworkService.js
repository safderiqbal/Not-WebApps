/**
 * Created by Simon on 26/10/13.
 */
var translator = require('./translators');
exports.send = function(req){
    var http = require('http'),
        CLOCKWORK_SERVICE_URL = 'https://api.clockworksms.com/http/send.aspx',
        API_KEY = '028646a5dff4200dd4539102cb07e37413de2896',
        request = require('request');

    request.post(
        CLOCKWORK_SERVICE_URL,
        {
            form: {
                key: API_KEY,
                to: req.toNumber,
                content: req.content
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
};

exports.receive = function(req, res) {
    console.log(req.body.from);
    console.log(req.body.content);

    var translated = translator.pirate(req.body.content)

    exports.send({
        toNumber: req.body.from,
        content: translated
    });

    res.end();
};