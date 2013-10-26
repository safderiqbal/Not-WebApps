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
    ermahgerd = require('./ermahgerd');

exports.available = ['pirate',
                'ermahgerd'];//,
               // 'yoda'];

exports.pirate = function (message, callback) {
    request.get(
        'http://isithackday.com/arrpi.php?format=json&text=' + encodeURI(message),
        {}, function (error, response, body) {
            callback(JSON.parse(body).translation.pirate);
        }
    );
}
exports.ermahgerd = function(message, callback) {
    var result;
    result = ermahgerd(message);
    callback(result);
}

exports.yoda = function(message, callback) {

}