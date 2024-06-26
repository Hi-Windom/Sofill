/*!
* sofill v1.1.10
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
* https://jsr.io/@sisi/sofill
*/
'use strict';

var index = require('../../index-DR7QqU83.js');
require('../../index-D9maxC_R.js');
var env = require('./env.cjs');

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

// 参考资料：https://juejin.cn/post/6844904007102627847
function sout() {
    return {
        debug: true,
        log: log,
        slog: slog,
        print: print,
        info: info,
        success: success,
        warn: warn,
        unsure: unsure,
        ops: ops,
        error: error,
        good: good,
        wink: wink,
        bad: bad,
        tracker: tracker,
        table: table,
        showAll: () => {
            window.sout.debug = true;
            window.sout.log("test");
            window.sout.slog("test");
            window.sout.print("test");
            window.sout.info("test");
            window.sout.success("test");
            window.sout.warn("test");
            window.sout.unsure("test");
            window.sout.ops("test");
            window.sout.error("test");
            window.sout.good("test");
            window.sout.wink("test");
            window.sout.bad("test");
            window.sout.tracker("test");
            window.sout.table([
                {
                    id: 1,
                    name: "Marry",
                    age: 18,
                    sex: 0
                },
                {
                    id: 2,
                    name: "John",
                    age: 20,
                    sex: 1
                }
            ]);
        }
    };
}
function bad(m, head) {
    if (env.isSillotPhoneAppMode()) {
        console.log(m);
        return;
    }
    const t = typeof m === "string" ? "%s" : "%o";
    if (head) {
        console.log("%c%s%c" + t, "padding: 2px 4px;background: #000;color: #fff;border-radius: 2px;font-size: 40px", head, "color:red;font-size: 40px", m);
    }
    else {
        console.log("%c%s> %c" + t, "color:#858585;font-size: 12px", Date().split("GMT")[0].split(" ").at(-2), "color:red;font-size: 40px", m);
    }
}
function error(m, head) {
    if (env.isSillotPhoneAppMode()) {
        console.error(m);
        return;
    }
    const t = typeof m === "string" ? "%s" : "%o";
    if (head) {
        console.error("%c%s%c" + t, "padding: 2px 4px;background: #000;color: #fff;border-radius: 2px;font-size: large", head, "font-size: large", m);
    }
    else {
        console.error("%c%s> %c" + t, "color:#858585;font-size: 12px", Date().split("GMT")[0].split(" ").at(-2), "font-size: large", m);
    }
}
function good(m, head) {
    if (env.isSillotPhoneAppMode()) {
        console.log(m);
        return;
    }
    const t = typeof m === "string" ? "%s" : "%o";
    if (head) {
        console.log("%c%s%c" + t, "padding: 2px 4px;background: #000;color: #fff;border-radius: 2px;font-size: 18px", head, "color:yellow;font-size: 18px", m);
    }
    else {
        console.log("%c%s> %c" + t, "color:#858585;font-size: 12px", Date().split("GMT")[0].split(" ").at(-2), "color:yellow;font-size: 18px", m);
    }
}
function info(m, head) {
    if (env.isSillotPhoneAppMode()) {
        console.log(m);
        return;
    }
    if (!window.sout.debug)
        return;
    const t = typeof m === "string" ? "%s" : "%o";
    if (head) {
        console.log("%c%s%c" + t, "padding: 2px 4px;background: #000;color: #fff;border-radius: 2px;font-size: large", head, "color:lightblue;font-size: large", m);
    }
    else {
        console.log("%c%s> %c" + t, "color:#858585;font-size: 12px", Date().split("GMT")[0].split(" ").at(-2), "color:lightblue;font-size: large", m);
    }
}
function log(m) {
    if (!window.sout.debug)
        return;
    if (env.isSillotPhoneAppMode()) {
        console.log(m);
        return;
    }
    const t = typeof m === "string" ? "%s" : "%o";
    console.log("%c" + t, "color:#858585;font-size: 12px", m);
}
function ops(m, head) {
    if (env.isSillotPhoneAppMode()) {
        console.warn(m);
        return;
    }
    const t = typeof m === "string" ? "%s" : "%o";
    if (head) {
        console.warn("%c%s%c" + t, "padding: 2px 4px;background: #000;color: #fff;border-radius: 2px;font-size: 18px", head, "color:orangered;font-size: 18px", m);
    }
    else {
        console.warn("%c%s> %c" + t, "color:#858585;font-size: 12px", Date().split("GMT")[0].split(" ").at(-2), "color:orangered;font-size: 18px", m);
    }
}
function print(m, head) {
    if (env.isSillotPhoneAppMode()) {
        console.log(m);
        return;
    }
    const t = typeof m === "string" ? "%s" : "%o";
    if (head) {
        console.log("%c%s%c" + t, "padding: 2px 4px;background: #000;color: #fff;border-radius: 2px;font-size: 32px", head, "color:#a8c8b8;font-size: 32px", m);
    }
    else {
        console.log("%c" + t, "color:#a8c8b8;font-size: 32px", m);
    }
}
function slog(m) {
    if (env.isSillotPhoneAppMode()) {
        console.log(m);
        return;
    }
    if (!window.sout.debug)
        return;
    const t = typeof m === "string" ? "%s" : "%o";
    console.log("%c" + t, "color:#585858;font-size: 10px", m);
}
function success(m, head) {
    if (!window.sout.debug)
        return;
    if (env.isSillotPhoneAppMode()) {
        console.log(m);
        return;
    }
    const t = typeof m === "string" ? "%s" : "%o";
    if (head) {
        console.log("%c%s%c" + t, "padding: 2px 4px;background: #000;color: #fff;border-radius: 2px;font-size: 16px", head, "color:lime;font-size: 16px", m);
    }
    else {
        console.log("%c%s> %c" + t, "color:#858585;font-size: 12px", Date().split("GMT")[0].split(" ").at(-2), "color:lime;font-size: 16px", m);
    }
}
function table(m) {
    try {
        console.table(m);
    }
    catch (e) {
        console.log(m);
        console.error(e);
    }
}
function tracker(m, ...additionalMessages) {
    if (!window.sout.debug)
        return;
    const FN = new Error().stack.split("\n")[2].trim().split(" ")[1];
    if (env.isSillotPhoneAppMode()) {
        console.log(`${FN} -> ${m}`);
    }
    else {
        const t = typeof m === "string" ? "%s" : "%o";
        console.log(`%c%s%c${t}`, "padding: 2px 4px;margin: 2px;background: #CB5831;color: white;border-radius: 2px;font-size: 16px", // #CB5831 能在明暗主题的DevTools均清晰显示超链接的蓝色字体
        FN, "padding: 2px 4px;color: #1BA1E2;font-size: 16px", m);
        additionalMessages.forEach((message) => {
            console.log(message);
        });
        console.warn(FN); // 兼容 vConsole
    }
}
function unsure(m, head) {
    if (env.isSillotPhoneAppMode()) {
        console.warn(m);
        return;
    }
    const t = typeof m === "string" ? "%s" : "%o";
    if (head) {
        console.warn("%c%s%c" + t, "padding: 2px 4px;background: #000;color: #fff;border-radius: 2px;font-size: 18px", head, "color:gold;font-size: 18px", m);
    }
    else {
        console.warn("%c%s> %c" + t, "color:#858585;font-size: 12px", Date().split("GMT")[0].split(" ").at(-2), "color:gold;font-size: 18px", m);
    }
}
function warn(m, head) {
    if (env.isSillotPhoneAppMode()) {
        console.warn(m);
        return;
    }
    const t = typeof m === "string" ? "%s" : "%o";
    if (head) {
        console.warn("%c%s%c" + t, "padding: 2px 4px;background: #000;color: #fff;border-radius: 2px;font-size: 16px", head, "color:yellow;font-size: 16px", m);
    }
    else {
        console.warn("%c%s> %c" + t, "color:#858585;font-size: 12px", Date().split("GMT")[0].split(" ").at(-2), "color:yellow;font-size: 16px", m);
    }
}
function wink(m, head) {
    if (env.isSillotPhoneAppMode()) {
        console.log(m);
        return;
    }
    const t = typeof m === "string" ? "%s" : "%o";
    if (head) {
        console.log("%c%s%c" + t, "padding: 2px 4px;background: #000;color: #fff;border-radius: 2px;font-size: 22px", head, "color:red;font-size: 40px", m);
    }
    else {
        console.log("%c%s> %c" + t, "color:#858585;font-size: 12px", Date().split("GMT")[0].split(" ").at(-2), "color:PaleVioletRed;font-size: 22px", m);
    }
}

exports.mountEnv = mountEnv;
exports.mountLocales = mountLocales;
exports.sout = sout;
