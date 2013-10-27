/**
 * Created by Safder on 26/10/13.
 */

var http,
    options,
    callback,
    ermahgerd,
    request,
    htmlEscape,
    htmlUnescape,
    mashape_key,
    yandex_key,
    xtend,
    pull_yandex_list;

http = require('http'),
    options = {
        host: '',
        path: ''
    },
    request = require('request')
    xtend = require('xtend'),
    ermahgerd = require('./ermahgerd').translate,
    mashape_key = 'OJaFr3xagIi5v2M75FTMnP78eQpD973C'
    yandex_key = 'trnsl.1.1.20131027T100107Z.fde43fed6e42a72d.19b8b20bb9f723620d058c4c2b6f53b40aa6bf2d';

var available = ['pirate',
                'ermahgerd',
                'yoda',
                'jive',
                'swedish_chef',
                'pig_latin',
                'valley_girls',
                '1337sp34k'];

exports.available = function () {
    return available;
}

var pull_yandex_list = function(){
    try {
        request.get(
            'https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=' + yandex_key +
                '&ui=uk',
            {}, function(error, response, body){
                console.log(JSON.parse(body).dirs);
                available = available.concat(JSON.parse(body).dirs.filter(function(arg){
                    return arg.indexOf('en') !== -1;
                }));
            }
        )
    }
    catch (e)
    {console.log(e);}
};

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
        {headers: {'X-Mashape-Authorization': mashape_key}},
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

exports.pig_latin = function(message, callback) {
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'http://www.cs.utexas.edu/users/jbc/bork/bork.cgi?input=' + encodeURI(sendMessage) + '&type=piglatin', {},
        function(error, response, body){
            console.log('Pig_latin: ' + decodeURI(body));
            callback(decodeURI(body));
        }
    )
}

exports.valley_girls = function(message, callback) {
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'http://www.cs.utexas.edu/users/jbc/bork/bork.cgi?input=' + encodeURI(sendMessage) + '&type=valspeak', {},
        function(error, response, body){
            console.log('valley_girls: ' + decodeURI(body));
            callback(decodeURI(body));
        }
    )
}

exports['1337sp34k'] = function (message, callback) {
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'https://montanaflynn-l33t-sp34k.p.mashape.com/encode?text=' + encodeURI(sendMessage),
        {headers: {'X-Mashape-Authorization': mashape_key}},
        function(error, response, body) {
            console.log('1337speak: ' + body);
            callback(body);
        }
    )
}

exports.yandex = function (language, message, callback) {
    request.get(
        '',
        {},
        function(error, response, body){
            console.log('placeholder: ' + body);
        }
    )
}

//ERMAHGERD! HERPER METHERDS!
// Taken from http://stackoverflow.com/a/7124052
htmlEscape = function (str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

htmlUnescape = function (value){
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

pull_yandex_list();