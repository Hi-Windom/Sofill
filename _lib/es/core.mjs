/*!
* sofill v1.0.50
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
import { f as bodyCC, e as bodyRC, c as bodyAC } from '../../index-70012633.js';
import '../../localforage-55c06e02.js';
import '../../index-3f9d32af.js';

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
