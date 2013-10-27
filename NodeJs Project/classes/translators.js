/**
 * Created by Safder on 26/10/13.
 */

var http,
    options,
    callback,
    ermahgerd,
    request,
    htmlEscape,
    htmlUnescape,
    mashape_key,
    yandex_key,
    xtend,
    pull_yandex_list,
    random_func,
    available,
    availableForRandom;

http = require('http'),
options = {
    host: '',
    path: ''},
request = require('request')
ermahgerd = require('./ermahgerd').translate,
mashape_key = 'OJaFr3xagIi5v2M75FTMnP78eQpD973C'
yandex_key = 'trnsl.1.1.20131027T100107Z.fde43fed6e42a72d.19b8b20bb9f723620d058c4c2b6f53b40aa6bf2d'
available = ['pirate',
                'ermahgerd',
                'yoda',
                'jive',
                'swedish_chef',
                'pig_latin',
                'valley_girls',
                '1337sp34k'],
availableForRandom = available.slice(0,available.length);

exports.available = function () {
    return available;
}

var pull_yandex_list = function(){
    try {
        request.get(
            'https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=' + yandex_key +
                '&ui=uk',
            {}, function(error, response, body){
                console.log(JSON.parse(body).dirs);
                available = available.concat(JSON.parse(body).dirs.filter(function(arg){
                    return arg.indexOf('en') !== -1;
                }));
            }
        )
    }
    catch (e)
    {console.log(e);}
};

exports.pirate = function (message, callback) {
    // doesn't handle apostrophe's so we strip 'em
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'http://isithackday.com/arrpi.php?format=json&text=' + encodeURI(sendMessage),
        {}, function (error, response, body) {
            console.log('pirate: ' + JSON.parse(body).translation.pirate);
            callback(JSON.parse(body).translation.pirate);
        }
    );
}
exports.ermahgerd = function(message, callback) {
    var result;
    result = ermahgerd(message);
    console.log('ermahgerd: ' + result);
    callback(result);
}

exports.yoda = function(message, callback) {
    request.get(
        'https://yoda.p.mashape.com/yoda?sentence=' + encodeURI(message),
        {headers: {'X-Mashape-Authorization': mashape_key}},
        function(error, response, body) {
            console.log('yoda: ' + body);
            callback(body);
        }
    )
}

exports.jive = function(message, callback) {
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'http://www.cs.utexas.edu/users/jbc/bork/bork.cgi?input=' + encodeURI(sendMessage) + '&type=jive', {},
        function(error, response, body){
            console.log('Jive: ' + decodeURI(body));
            console.log('Jive: ' + body);
            callback(decodeURI(body));
        }
    )
}

exports.swedish_chef = function(message, callback) {
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'http://www.cs.utexas.edu/users/jbc/bork/bork.cgi?input=' + encodeURI(sendMessage) + '&type=chef', {},
        function(error, response, body){
            console.log('swedish_chef: ' + decodeURI(body));
            callback(decodeURI(body));
        }
    )
}

exports.pig_latin = function(message, callback) {
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'http://www.cs.utexas.edu/users/jbc/bork/bork.cgi?input=' + encodeURI(sendMessage) + '&type=piglatin', {},
        function(error, response, body){
            console.log('Pig_latin: ' + decodeURI(body));
            callback(decodeURI(body));
        }
    )
}

exports.valley_girls = function(message, callback) {
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'http://www.cs.utexas.edu/users/jbc/bork/bork.cgi?input=' + encodeURI(sendMessage) + '&type=valspeak', {},
        function(error, response, body){
            console.log('valley_girls: ' + decodeURI(body));
            callback(decodeURI(body));
        }
    )
}

exports['1337sp34k'] = function (message, callback) {
    var sendMessage = message.replace(/'/g,"");
    request.get(
        'https://montanaflynn-l33t-sp34k.p.mashape.com/encode?text=' + encodeURI(sendMessage),
        {headers: {'X-Mashape-Authorization': mashape_key}},
        function(error, response, body) {
            console.log('1337speak: ' + body);
            callback(body);
        }
    )
}

exports.random = function(message, callback) {
    var randomNum,
        randomTranslator;
    randomNum = random_func(0, availableForRandom.length);
    randomTranslator = availableForRandom[randomNum];
    exports[randomTranslator](message, callback);
}


exports.yandex = function (language, message, callback) {
    request.get(
        'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + yandex_key +
            '&lang=' + language + '&text=' + message,
        {},
        function(error, response, body){
            console.log('yandex: ' + JSON.parse(body).text.join('').placeholder);
            callback(JSON.parse(body).text.join(''));
        }
    )
}

exports['ru-en'] = function (message, callback) {
    exports.yandex('ru-en',message,callback);
}

exports['en-ru'] = function (message, callback) {
    exports.yandex('en-ru',message,callback);
}

exports['en-hu'] = function (message, callback) {
    exports.yandex('en-hu',message,callback);
}

exports['en-uk'] = function (message, callback) {
    exports.yandex('en-uk',message,callback);
}

exports['en-de'] = function (message, callback) {
    exports.yandex('en-de',message,callback);
}

exports['en-fr'] = function (message, callback) {
    exports.yandex('en-fr',message,callback);
}

exports['en-be'] = function (message, callback) {
    exports.yandex('en-be',message,callback);
}

exports['en-fr'] = function (message, callback) {
    exports.yandex('en-fr',message,callback);
}

exports['en-be'] = function (message, callback) {
    exports.yandex('en-be',message,callback);
}

exports['en-sq'] = function (message, callback) {
    exports.yandex('en-sq',message,callback);
}

exports['en-es'] = function (message, callback) {
    exports.yandex('en-es',message,callback);
}

exports['en-it'] = function (message, callback) {
    exports.yandex('en-it',message,callback);
}

exports['en-da'] = function (message, callback) {
    exports.yandex('en-da',message,callback);
}

exports['en-pt'] = function (message, callback) {
    exports.yandex('en-pt',message,callback);
}

exports['en-sk'] = function (message, callback) {
    exports.yandex('en-sk',message,callback);
}

exports['en-sl'] = function (message, callback) {
    exports.yandex('en-sl',message,callback);
}

exports['en-nl'] = function (message, callback) {
    exports.yandex('en-nl',message,callback);
}

exports['en-ca'] = function (message, callback) {
    exports.yandex('en-ca',message,callback);
}

exports['en-cs'] = function (message, callback) {
    exports.yandex('en-cs',message,callback);
}

exports['en-el'] = function (message, callback) {
    exports.yandex('en-el',message,callback);
}

exports['en-no'] = function (message, callback) {
    exports.yandex('en-no',message,callback);
}

exports['en-mk'] = function (message, callback) {
    exports.yandex('en-mk',message,callback);
}

exports['en-sv'] = function (message, callback) {
    exports.yandex('en-sv',message,callback);
}

exports['en-fi'] = function (message, callback) {
    exports.yandex('en-fi',message,callback);
}

exports['en-et'] = function (message, callback) {
    exports.yandex('en-et',message,callback);
}

exports['en-lv'] = function (message, callback) {
    exports.yandex('en-lv',message,callback);
}

exports['en-lt'] = function (message, callback) {
    exports.yandex('en-lt',message,callback);
}

exports['en-tr'] = function (message, callback) {
    exports.yandex('en-tr',message,callback);
}

exports['hu-en'] = function (message, callback) {
    exports.yandex('hu-en',message,callback);
}

exports['uk-en'] = function (message, callback) {
    exports.yandex('uk-en',message,callback);
}

exports['de-en'] = function (message, callback) {
    exports.yandex('de-en',message,callback);
}

exports['fr-en'] = function (message, callback) {
    exports.yandex('fr-en',message,callback);
}

exports['be-en'] = function (message, callback) {
    exports.yandex('be-en',message,callback);
}

exports['sq-en'] = function (message, callback) {
    exports.yandex('sq-en',message,callback);
}

exports['es-en'] = function (message, callback) {
    exports.yandex('es-en',message,callback);
}

exports['it-en'] = function (message, callback) {
    exports.yandex('it-en',message,callback);
}

exports['da-en'] = function (message, callback) {
    exports.yandex('da-en',message,callback);
}

exports['pt-en'] = function (message, callback) {
    exports.yandex('pt-en',message,callback);
}

exports['sk-en'] = function (message, callback) {
    exports.yandex('sk-en',message,callback);
}

exports['sl-en'] = function (message, callback) {
    exports.yandex('sl-en',message,callback);
}

exports['nl-en'] = function (message, callback) {
    exports.yandex('nl-en',message,callback);
}

exports['ca-en'] = function (message, callback) {
    exports.yandex('ca-en',message,callback);
}

exports['cs-en'] = function (message, callback) {
    exports.yandex('cs-en',message,callback);
}

exports['el-en'] = function (message, callback) {
    exports.yandex('el-en',message,callback);
}

exports['no-en'] = function (message, callback) {
    exports.yandex('no-en',message,callback);
}

exports['mk-en'] = function (message, callback) {
    exports.yandex('mk-en',message,callback);
}

exports['sv-en'] = function (message, callback) {
    exports.yandex('sv-en',message,callback);
}

exports['fi-en'] = function (message, callback) {
    exports.yandex('fi-en',message,callback);
}

exports['et-en'] = function (message, callback) {
    exports.yandex('et-en',message,callback);
}

exports['lv-en'] = function (message, callback) {
    exports.yandex('lv-en',message,callback);
}

exports['lt-en'] = function (message, callback) {
    exports.yandex('lt-en',message,callback);
}

exports['tr-en'] = function (message, callback) {
    exports.yandex('tr-en',message,callback);
}

//ERMAHGERD! HERPER METHERDS!
// Taken from http://stackoverflow.com/a/7124052
htmlEscape = function (str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

htmlUnescape = function (value){
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

random_func = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

pull_yandex_list();