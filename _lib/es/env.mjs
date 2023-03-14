/*!
* sofill v1.0.50
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
function isAppMode() {
    return navigator.userAgent.toLowerCase().startsWith("siyuan");
}
function isDesktopAppMode() {
    return !isAppMode()
        ? false
        : window.siyuan?.config.system.os === "windows" ||
            window.siyuan?.config.system.os === "darwin"
            ? true
            : false;
}
function isPhoneAppMode() {
    return document.body.classList.contains("body--mobile") && isAppMode();
}
function isPadAppMode() {
    return document.body.classList.contains("body--desktop") && isAppMode();
}

export { isAppMode, isDesktopAppMode, isPadAppMode, isPhoneAppMode };
