/**
 * Created by Safder on 26/10/13.
 */
var http,
    options,
    callback,
    message,
    request;

http = require('http'),
options = {
    host:'',
    path:''
},
request = require('request');
callback = function(error,response,body) {
    var str = '';
    console.log('callback entered');
    console.log(body);
};

exports.pirate = function (req, res){
    request.get('http://isithackday.com/arrpi.php?format=json&text='+encodeURI(req.query.message),
        {},
        callback);
    res.end();
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