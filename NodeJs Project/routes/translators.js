/**
 * Created by Safder on 26/10/13.
 */
var http,
    options,
    callback,
    message;

http = require('http'),
options = {
    host:'',
    path:''
};
callback = function(response) {
    var str = '';
    console.log('callback entered');
    response.on('data', function (chunk) {
        str += chunk;
        console.log(chunk);
    });
    response.on('end', function () {
        console.log(str);
    })
};

exports.pirate = function (req, res){
        options.host = 'http://isithackday.com/';
        options.path = 'arrpi.php?format=json&text=' + encodeURI(message);
        http.request(options, callback).end();
        res.send('');
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