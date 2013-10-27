
/*
 * GET home page.
 */

var available = require('../classes/translators').available;
var sockets = require('../sockets/listener');

exports.index = function(req, res){
  res.render('index', { title: 'Text Routlette', sessionId: sockets.getSessionId(), translators: available });
};