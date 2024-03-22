/*!
* sofill v1.1.1
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
'use strict';

var index$1 = require('../../index-64518535.js');
require('../../localforage-7e913f80.js');
require('../../index-fb3d0ae9.js');
var index = require('../../index-cd69bb2c.js');
require('../../index-fb136fde.js');

function addUC() {
    if (window.siyuan.user == null) {
        index$1.bodyRC("user--Sub");
        index$1.bodyRC("user--NonSub");
        index$1.bodyAC("user--null");
    }
    else if (window.siyuan.user.userSiYuanProExpireTime > Date.now()) {
        index$1.bodyRC("user--null");
        index$1.bodyRC("user--NonSub");
        index$1.bodyAC("user--Sub");
    }
    else {
        index$1.bodyRC("user--null");
        index$1.bodyRC("user--Sub");
        index$1.bodyAC("user--NonSub");
    }
}
function mountLocales(lang) {
    window.sofill.lang = lang;
}
function mountSillotEnv2Siyuan() {
    let url = new URL(window.location.href);
    switch (true) {
        case url.pathname.startsWith("/stage/build/app"):
            index$1.bodyAC("body--app");
            break;
        case url.pathname.startsWith("/stage/build/desktop"):
            index$1.bodyAC("body--desktop");
            break;
        case url.pathname.startsWith("/stage/build/mobile"):
            index$1.bodyAC("body--mobile");
            break;
        default:
            index$1.bodyAC("body--unkown");
            break;
    }
}
function mountEnv() {
    if (!index$1.bodyCC("branch--Sillot"))
        mountSillotEnv2Siyuan();
    setInterval(() => {
        addUC();
    }, 5800);
}

exports.bad = index.bad;
exports.error = index.error;
exports.good = index.good;
exports.info = index.info;
exports.log = index.log;
exports.ops = index.ops;
exports.print = index.print;
exports.slog = index.slog;
exports.success = index.success;
exports.table = index.table;
exports.tracker = index.tracker;
exports.unsure = index.unsure;
exports.warn = index.warn;
exports.wink = index.wink;
exports.mountEnv = mountEnv;
exports.mountLocales = mountLocales;
