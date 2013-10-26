
/*
 * POST send text.
 */
var clockworkService = require('./clockworkService');

exports.send = function(req, res){
    clockworkService.send(req.body.to, req.body.text);
    res.send("blerb");
}