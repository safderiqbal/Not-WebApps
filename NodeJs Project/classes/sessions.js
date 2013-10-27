/**
 * Created by Simon on 27/10/13.
 */

exports.sessions = [];

exports.addSession = function (from, to) {
    exports.sessions.push({
        from: from,
        to: to
    });

    return exports.sessions.length;
};

exports.getSessionById = function (sessionId) {
    return exports.sessions[sessionId - 1];
};

exports.getSessionByToNumber = function (to) {
    var matchedEl;

    exports.sessions.forEach(function (el, index, array) {
        if (el.to === to) {
            matchedEl = el;
        }
    });

    return matchedEl;
};