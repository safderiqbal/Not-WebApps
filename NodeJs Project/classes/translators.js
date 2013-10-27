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
                'yoda'];

exports.pirate = function (message, callback) {
    request.get(
        'http://isithackday.com/arrpi.php?format=json&text=' + encodeURI(message),
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