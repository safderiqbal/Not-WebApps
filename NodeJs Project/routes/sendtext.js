
/*
 * POST send text.
 */
var clockworkService = require('./clockworkService');

exports.send = function(req, res){
    clockworkService.send({
        toNumber: req.body.to,
        content: req.body.text
    });

    res.send("blerb");
}