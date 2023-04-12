/*!
* sofill v1.0.73
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
import { f as bodyCC, e as bodyRC, c as bodyAC } from '../../index-533608f1.js';
import '../../localforage-4e3eb703.js';
import '../../index-5dd8cc59.js';

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
