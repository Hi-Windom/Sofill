/*!
* sofill v1.1.1
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
import { f as bodyCC, e as bodyRC, c as bodyAC } from '../../index-13ab85fc.js';
import '../../localforage-83a0396b.js';
import '../../index-0aa002dd.js';
export { b as bad, e as error, g as good, i as info, l as log, o as ops, p as print, s as slog, a as success, t as table, c as tracker, u as unsure, w as warn, d as wink } from '../../index-4fa64414.js';
import '../../index-84442f55.js';

function addUC() {
    if (window.siyuan.user == null) {
        bodyRC("user--Sub");
        bodyRC("user--NonSub");
        bodyAC("user--null");
    }
    else if (window.siyuan.user.userSiYuanProExpireTime > Date.now()) {
        bodyRC("user--null");
        bodyRC("user--NonSub");
        bodyAC("user--Sub");
    }
    else {
        bodyRC("user--null");
        bodyRC("user--Sub");
        bodyAC("user--NonSub");
    }
}
function mountLocales(lang) {
    window.sofill.lang = lang;
}
function mountSillotEnv2Siyuan() {
    let url = new URL(window.location.href);
    switch (true) {
        case url.pathname.startsWith("/stage/build/app"):
            bodyAC("body--app");
            break;
        case url.pathname.startsWith("/stage/build/desktop"):
            bodyAC("body--desktop");
            break;
        case url.pathname.startsWith("/stage/build/mobile"):
            bodyAC("body--mobile");
            break;
        default:
            bodyAC("body--unkown");
            break;
    }
}
function mountEnv() {
    if (!bodyCC("branch--Sillot"))
        mountSillotEnv2Siyuan();
    setInterval(() => {
        addUC();
    }, 5800);
}

export { mountEnv, mountLocales };
