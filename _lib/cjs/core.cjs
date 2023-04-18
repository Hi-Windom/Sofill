/*!
* sofill v1.0.74
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
'use strict';

var index = require('../../index-097e0589.js');
require('../../localforage-f2741b44.js');
require('../../index-671dc868.js');

function addUC() {
    if (window.siyuan.user == null) {
        index.bodyRC("user--Sub");
        index.bodyRC("user--NonSub");
        index.bodyAC("user--null");
    }
    else if (window.siyuan.user.userSiYuanProExpireTime > Date.now()) {
        index.bodyRC("user--null");
        index.bodyRC("user--NonSub");
        index.bodyAC("user--Sub");
    }
    else {
        index.bodyRC("user--null");
        index.bodyRC("user--Sub");
        index.bodyAC("user--NonSub");
    }
}
function mountLocales(lang) {
    window.sofill.lang = lang;
}
function mountSillotEnv2Siyuan() {
    let url = new URL(window.location.href);
    switch (true) {
        case url.pathname.startsWith("/stage/build/app"):
            index.bodyAC("body--app");
            break;
        case url.pathname.startsWith("/stage/build/desktop"):
            index.bodyAC("body--desktop");
            break;
        case url.pathname.startsWith("/stage/build/mobile"):
            index.bodyAC("body--mobile");
            break;
        default:
            index.bodyAC("body--unkown");
            break;
    }
}
function mountEnv() {
    if (!index.bodyCC("branch--Sillot"))
        mountSillotEnv2Siyuan();
    setInterval(() => {
        addUC();
    }, 5800);
}

exports.mountEnv = mountEnv;
exports.mountLocales = mountLocales;
