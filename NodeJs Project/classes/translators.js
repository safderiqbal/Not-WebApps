/**
 * Created by Safder on 26/10/13.
 */

var http,
    options,
    callback,
    ermahgerd,
    request;

http = require('http'),
    options = {
        host: '',
        path: ''
    },
    request = require('request'),
    ermahgerd = require('./ermahgerd').translate;

exports.available = ['pirate',
                'ermahgerd',
                'yoda',
                'jive',
                'swedish_chef',
                'piglatin',
                'valleygirls',
                'leetspeak'];

exports.pirate = function (message, callback) {
    // doesn't handle apostrophe's so we strip 'em
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'http://isithackday.com/arrpi.php?format=json&text=' + encodeURI(sendMessage),
        {}, function (error, response, body) {
            console.log('pirate: ' + JSON.parse(body).translation.pirate);
            callback(JSON.parse(body).translation.pirate);
        }
    );
}
exports.ermahgerd = function(message, callback) {
    var result;
    result = ermahgerd(message);
    console.log('ermahgerd: ' + result);
    callback(result);
}

exports.yoda = function(message, callback) {
    request.get(
        'https://yoda.p.mashape.com/yoda?sentence=' + encodeURI(message),
        {headers: {'X-Mashape-Authorization': 'OJaFr3xagIi5v2M75FTMnP78eQpD973C'}},
        function(error, response, body) {
            console.log('yoda: ' + body);
            callback(body);
        }
    )
}

exports.jive = function(message, callback) {
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'http://www.cs.utexas.edu/users/jbc/bork/bork.cgi?input=' + encodeURI(sendMessage) + '&type=jive', {},
        function(error, response, body){
            console.log('Jive: ' + decodeURI(body));
            console.log('Jive: ' + body);
            callback(decodeURI(body));
        }
    )
}

exports.swedish_chef = function(message, callback) {
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'http://www.cs.utexas.edu/users/jbc/bork/bork.cgi?input=' + encodeURI(sendMessage) + '&type=chef', {},
        function(error, response, body){
            console.log('swedish_chef: ' + decodeURI(body));
            callback(decodeURI(body));
        }
    )
}

exports.piglatin = function(message, callback) {
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'http://www.cs.utexas.edu/users/jbc/bork/bork.cgi?input=' + encodeURI(sendMessage) + '&type=piglatin', {},
        function(error, response, body){
            console.log('Piglatin: ' + decodeURI(body));
            callback(decodeURI(body));
        }
    )
}

exports.valleygirls = function(message, callback) {
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'http://www.cs.utexas.edu/users/jbc/bork/bork.cgi?input=' + encodeURI(sendMessage) + '&type=valspeak', {},
        function(error, response, body){
            console.log('valley speak: ' + decodeURI(body));
            callback(decodeURI(body));
        }
    )
}

//curl --include --request GET 'https://montanaflynn-l33t-sp34k.p.mashape.com/encode?text=Make%20me%20sound%20like%20a%20script%20kiddie.' \
//--header "X-Mashape-Authorization: OJaFr3xagIi5v2M75FTMnP78eQpD973C"
exports.leetspeak = function (message, callback) {
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'https://montanaflynn-l33t-sp34k.p.mashape.com/encode?text=' + encodeURI(sendMessage),
        {headers: {'X-Mashape-Authorization': 'OJaFr3xagIi5v2M75FTMnP78eQpD973C'}},
        function(error, response, body) {
            console.log('leetspeak: ' + body);
            callback(body);
        }
    )
}