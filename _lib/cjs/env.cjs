/*!
* sofill v1.0.14
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
'use strict';

const config_Custom = "/conf/appearance/themes/Sofill-/config/Custom.json";
const config_UI = "/conf/appearance/themes/Sofill-/config/UI.json";
const themeStyle = document.getElementById("themeStyle"); // 当前主题引用路径
const THEME_ROOT = new URL(themeStyle.href).pathname.replace("theme.css", "");
const winsay_ROOT = "/appearance/themes/Sofill-/";
const winsay_ROOT_ABS = `${window.siyuan.config.system.confDir}\\appearance\\themes\\Sofill-\\`;
const S2_BASE = "/appearance/themes/Sofill-/style-S2/";
const S2_BASE_ABS = `${winsay_ROOT_ABS}style-S2/`;
const ID_COLOR_STYLE = "theme-color-style";
exports.ThemeName = "Sofill";
if (window.siyuan.config.appearance.mode) {
    exports.ThemeName = window.siyuan.config.appearance.themeDark;
}
else {
    exports.ThemeName = window.siyuan.config.appearance.themeLight;
}
exports.AliaName = "winsay";
switch (exports.ThemeName) {
    case "Sofill+":
        exports.AliaName = "lanco";
        break;
    case "Sofill=":
        exports.AliaName = "lili";
        break;
}
/* DOM 节点 ID */
const IDs = {
    STYLE_COLOR: "custom-id-style-theme-color",
    BUTTON_TOOLBAR_CHANGE_COLOR: "custom-id-button-toolbar-change-color",
};
var colors = [
    "root.css",
    "root-L-Blue.css",
    "root-L-Red.css",
    "root-L-Pink.css",
    "root-L-Green.css",
    "root-L-Yellow.css",
];
var colors2 = [
    "root-D-BlackGoldBlue.css",
    "root-D-InkGreenPurple.css",
];
const latest_LC_ID = "SC_winsay_cp_custom__LS";
const latest_DC_ID = "SC_winsay_cp_custom__DS";
/* 循环迭代器 */
var Iterator = function* (items) {
    for (let i = 0; true; i = (i + 1) % items.length) {
        yield items[i];
    }
};
var Iterator2 = function* (items) {
    for (let i = 0; true; i = (i + 1) % items.length) {
        yield items[i];
    }
};
// 安卓手机：android + body--mobile
// 安卓平板：android + body--desktop
/**
 * 获取客户端模式
 * @return {string} 'app' 或 'desktop' 或 'mobile'
 */
var clientMode = (() => {
    let url = new URL(window.location.href);
    switch (true) {
        case url.pathname.startsWith("/stage/build/app"):
            return "body--app";
        case url.pathname.startsWith("/stage/build/desktop"):
            return "body--desktop";
        case url.pathname.startsWith("/stage/build/mobile"):
            return "body--mobile";
        default:
            return null;
    }
})();
document.body.classList.add(clientMode);
document.body.classList.add(window.theme.OS);
var apitoken = window.siyuan.config.api.token;

exports.ID_COLOR_STYLE = ID_COLOR_STYLE;
exports.IDs = IDs;
exports.Iterator = Iterator;
exports.Iterator2 = Iterator2;
exports.S2_BASE = S2_BASE;
exports.S2_BASE_ABS = S2_BASE_ABS;
exports.THEME_ROOT = THEME_ROOT;
exports.apitoken = apitoken;
exports.clientMode = clientMode;
exports.colors = colors;
exports.colors2 = colors2;
exports.config_Custom = config_Custom;
exports.config_UI = config_UI;
exports.latest_DC_ID = latest_DC_ID;
exports.latest_LC_ID = latest_LC_ID;
exports.themeStyle = themeStyle;
exports.winsay_ROOT = winsay_ROOT;
exports.winsay_ROOT_ABS = winsay_ROOT_ABS;
