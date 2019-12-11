const replaceInFiles = require('replace-in-files');

let manifest = require('./dist/mix-manifest');

function preg_quote(str, delimiter) {
    //  discuss at: https://locutus.io/php/preg_quote/
    // original by: booeyOH
    // improved by: Ates Goral (https://magnetiq.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: preg_quote("$40")
    //   returns 1: '\\$40'
    //   example 2: preg_quote("*RRRING* Hello?")
    //   returns 2: '\\*RRRING\\* Hello\\?'
    //   example 3: preg_quote("\\.+*?[^]$(){}=!<>|:")
    //   returns 3: '\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:'

    return (str + '')
        .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&')
}

let regStr = Object.keys(manifest).map(asset => {
    return preg_quote(asset.replace(/^\//, ''), '')
}).join('|');



regStr = `('|")(${regStr})(\\?id\\=[0-9a-f]+)?("|')`;

console.log(regStr);
let from = new RegExp(regStr, 'g');

replaceInFiles({
    files: [
        './dist/**/*.html'
    ],
    from: from,
    to: function (fullMath, open, file, id, close) {
        return `"` + manifest[`/${file}`].replace(/^\//, '') + `"`;
    },
})
    .then(function (result) {
        console.log('Count of matches by paths: ', result.countOfMatchesByPaths);
        //console.log(result);
    })
    .catch(function (error) {
        console.error('Error occurred:', error);
    })
;
