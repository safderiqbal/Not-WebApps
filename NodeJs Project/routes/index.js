
/*
 * GET home page.
 */

var available = require('../classes/translators').available;

exports.index = function(req, res){
  res.render('index', { title: 'Text Routlette', sessionId: 'SESSIONID', translators: available });
};