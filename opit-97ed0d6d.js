/*!
* sofill v1.0.51
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
'use strict';

var localforage = require('./localforage-e8d37b12.js');

async function setItem(key, value, cb) {
    try {
        const v = await localforage.localforageExports.setItem(key, value);
        cb ? cb() : console.log(v);
        v(true);
    }
    catch (e) {
        console.error(e);
        e(false);
    }
}
function getItem(key, cb) {
    return localforage.localforageExports.getItem(key)
        .then((v) => {
        cb ? cb() : console.log(v);
    })
        .catch((e) => {
        console.error(e);
    });
}

exports.getItem = getItem;
exports.setItem = setItem;
