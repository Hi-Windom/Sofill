/*!
* sofill v1.0.73
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
function isAppMode(includeDocker = false) {
    if (includeDocker)
        return document.body.classList.contains("body--docker");
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
function isSillotPhoneAppMode() {
    return document.body.classList.contains("branch--Sillot") && isPhoneAppMode();
}

export { isAppMode, isDesktopAppMode, isPadAppMode, isPhoneAppMode, isSillotPhoneAppMode };
