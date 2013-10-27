/**
 * Created by Simon on 27/10/13.
 */

exports.sessions = [];

exports.addSession = function (from, to) {
    exports.sessions.push({
        from: from,
        to: to
    });
    console.log("from:" + from + ";to:" + to);
    return exports.sessions.length;
};

exports.getSessionById = function (sessionId) {
    return exports.sessions[sessionId - 1];
};

exports.getSessionByNumber = function (number) {
    var el;

    for (var i = exports.sessions.length - 1; i >= 0; i-- ) {
        el = exports.sessions[i];
        console.log(i + " - from:" + el.from + ";to:" + el.to);
        if (el.to === number) {
            return el.from;
        } else if (el.from === number) {
            return el.to;
        }
    }
};