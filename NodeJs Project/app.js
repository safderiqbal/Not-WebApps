
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var receiveText = require('./routes/receiveText');
var translator = require('./classes/translators');
var session = require('./classes/sessions');
var http = require('http');
var path = require('path');

var socketio = require('socket.io');
var listener = require('./sockets/listener');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/receive', receiveText.receive);

app.get('/test_pirate', translator.pirate);
app.get('/test_yoda', translator.yoda);
app.get('/test_ermahgerd', translator.ermahgerd);

var server =  http.createServer(app);
var io = socketio.listen(server);

io.sockets.on('connection', listener.connection);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});