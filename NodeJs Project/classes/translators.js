/**
 * Created by Safder on 26/10/13.
 */
var http,
    options,
    callback,
    message,
    request,
    list;

http = require('http'),
    options = {
        host: '',
        path: ''
    },
    request = require('request'),
    list = {}
;

exports.pirate = function (message, callback) {
    request.get(
        'http://isithackday.com/arrpi.php?format=json&text=' + encodeURI(message),
        {}, function (error, response, body) {
            callback(JSON.parse(body).translation.pirate);
        }
    );
}
//    ermahgerd: function(message){
//        // something
//        return true;
//    },
//    yoda: function(message){
//        //something
//        return true;
//    }
//}