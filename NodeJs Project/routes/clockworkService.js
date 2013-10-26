/**
 * Created by Simon on 26/10/13.
 */

exports.send = (function(){
    var http = require('http'),
        CLOCKWORK_SERVICE_URL = 'https://api.clockworksms.com/http/send.aspx',
        API_KEY = '028646a5dff4200dd4539102cb07e37413de2896',
        request = require('request');

    var sendText = function (toNumber, content) {
        request.post(
            CLOCKWORK_SERVICE_URL
            , {
                form: {
                    key: API_KEY,
                    to: toNumber,
                    content: content
                }
            }
            , function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('error' + body);
                }
            }
        );
    };

    return sendText;
 }());