
/*
 * GET home page.
 */

var available = require('../classes/translators').available;
var sockets = require('../sockets/listener');

exports.index = function(req, res){
  res.render('index', { title: 'Text Roulette', sessionId: sockets.getSessionId(), translators: available() });
};