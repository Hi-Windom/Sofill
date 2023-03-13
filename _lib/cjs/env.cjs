/*!
* sofill v1.0.39
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
'use strict';

function isAppMode() {
    return document.getElementsByTagName("body")[0].classList.contains("android")
        ? false
        : document
            .getElementsByTagName("body")[0]
            .classList.contains("body--desktop")
            ? false
            : window.siyuan.config.system.os === "windows" ||
                window.siyuan.config.system.os === "darwin"
                ? true
                : false;
}
function isDesktopAppMode() {
    let cl = window.document.body.classList;
    return cl.contains("android")
        ? false
        : cl.contains("client--browser")
            ? false
            : window.siyuan.config.system.os === "windows" ||
                window.siyuan.config.system.os === "darwin"
                ? true
                : false;
}
function isPhoneAppMode() {
    let x = document.body.classList.contains("body--mobile");
    let y = document.body.classList.contains("client--siyuan");
    if (x && y) {
        return true;
    }
    else {
        return false;
    }
}

exports.isAppMode = isAppMode;
exports.isDesktopAppMode = isDesktopAppMode;
exports.isPhoneAppMode = isPhoneAppMode;
