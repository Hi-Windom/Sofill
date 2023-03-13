/*!
* sofill v1.0.38
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
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

// const config_Custom = "/conf/appearance/themes/Sofill-/config/Custom.json";
// const config_UI = "/conf/appearance/themes/Sofill-/config/UI.json";
// const themeStyle = document.getElementById("themeStyle") as HTMLLinkElement; // 当前主题引用路径
// const THEME_ROOT = new URL(themeStyle.href).pathname.replace("theme.css", "");
// const winsay_ROOT = "/appearance/themes/Sofill-/";
// const winsay_ROOT_ABS = `${window.siyuan.config.system.confDir}\\appearance\\themes\\Sofill-\\`;
// const S2_BASE = "/appearance/themes/Sofill-/style-S2/";
// const S2_BASE_ABS = `${winsay_ROOT_ABS}style-S2/`;
// const ID_COLOR_STYLE = "theme-color-style";
// var ThemeName = "Sofill";
// if (window.siyuan.config.appearance.mode) {
//   ThemeName = window.siyuan.config.appearance.themeDark;
// } else {
//   ThemeName = window.siyuan.config.appearance.themeLight;
// }
// var AliaName = "winsay";
// switch (ThemeName) {
//   case "Sofill+":
//     AliaName = "lanco";
//     break;
//   case "Sofill=":
//     AliaName = "lili";
//     break;
// }
// /* DOM 节点 ID */
// const IDs = {
//   STYLE_COLOR: "custom-id-style-theme-color",
//   BUTTON_TOOLBAR_CHANGE_COLOR: "custom-id-button-toolbar-change-color",
// };
// var colors = [
//   "root.css",
//   "root-L-Blue.css",
//   "root-L-Red.css",
//   "root-L-Pink.css",
//   "root-L-Green.css",
//   "root-L-Yellow.css",
// ];
// var colors2 = [
//   "root-D-BlackGoldBlue.css",
//   "root-D-InkGreenPurple.css",
// ];
// const latest_LC_ID = "SC_winsay_cp_custom__LS";
// const latest_DC_ID = "SC_winsay_cp_custom__DS";
// /* 循环迭代器 */
// var Iterator = function* (items) {
//   for (let i = 0; true; i = (i + 1) % items.length) {
//     yield items[i];
//   }
// };
// var Iterator2 = function* (items) {
//   for (let i = 0; true; i = (i + 1) % items.length) {
//     yield items[i];
//   }
// };
// // 安卓手机：android + body--mobile
// // 安卓平板：android + body--desktop
// /**
//  * 获取客户端模式
//  * @return {string} 'app' 或 'desktop' 或 'mobile'
//  */
// var clientMode = (() => {
//   let url = new URL(window.location.href);
//   switch (true) {
//     case url.pathname.startsWith("/stage/build/app"):
//       return "body--app";
//     case url.pathname.startsWith("/stage/build/desktop"):
//       return "body--desktop";
//     case url.pathname.startsWith("/stage/build/mobile"):
//       return "body--mobile";
//     default:
//       return null;
//   }
// })();
// document.body.classList.add(clientMode);
// document.body.classList.add(window.theme.OS);
var apitoken = window.siyuan.config.api.token;

export { apitoken, isAppMode, isDesktopAppMode, isPhoneAppMode };
