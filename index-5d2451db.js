/*!
* sofill v1.0.55
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
'use strict';

// 如果 version1 > version2 返回 1，如果 version1 < version2 返回 -1， 除此之外返回 0。
function compareVersion(version1, version2) {
    const arr1 = version1.split(".");
    const arr2 = version2.split(".");
    const length1 = arr1.length;
    const length2 = arr2.length;
    const minlength = Math.min(length1, length2);
    let i = 0;
    for (i; i < minlength; i++) {
        let a = parseInt(arr1[i]);
        let b = parseInt(arr2[i]);
        if (a > b) {
            return 1;
        }
        else if (a < b) {
            return -1;
        }
    }
    if (length1 > length2) {
        for (let j = i; j < length1; j++) {
            if (parseInt(arr1[j]) !== 0) {
                return 1;
            }
        }
        return 0;
    }
    else if (length1 < length2) {
        for (let j = i; j < length2; j++) {
            if (parseInt(arr2[j]) !== 0) {
                return -1;
            }
        }
        return 0;
    }
    return 0;
}
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
const getThemeMode = (() => {
    /* 根据配置选项判断主题 */
    switch (window.siyuan?.config.appearance.mode) {
        case 0:
            return "light";
        case 1:
            return "dark";
        default:
            return null;
    }
})();
const isPromise = (val) => {
    return typeof val.then === "function";
};
//判断对象是否为空
function isEmpty(obj) {
    return typeof obj === "undefined" || obj === null || obj === "";
}
//判断字符串是否为空
function isEmptyString(obj) {
    return (typeof obj !== "string" ||
        obj === null ||
        obj === "" ||
        obj === "null" ||
        obj === "NULL");
}
function RangeLimitedInt(min, value1, max) {
    var v1 = parseInt(min, 10);
    var v2 = parseInt(value1, 10);
    var v3 = parseInt(max, 10);
    var vmin = v2 < v3 ? v2 : v3;
    var vmax = v1 > vmin ? v1 : vmin;
    return vmax;
}
function removejscssfile(filename, filetype) {
    var targetelement = filetype === "js" ? "script" : filetype === "css" ? "link" : "none";
    var targetattr = filetype === "js" ? "src" : filetype === "css" ? "href" : "none";
    var allsuspects = document.getElementsByTagName(targetelement);
    for (var i = allsuspects.length; i >= 0; i--) {
        if (allsuspects[i]?.getAttribute(targetattr) != null &&
            allsuspects[i].getAttribute(targetattr).indexOf(filename) !== -1)
            allsuspects[i].parentNode.removeChild(allsuspects[i]);
    }
}
/**
 * 为元素注册监听事件
 * @param {Element} element
 * @param {string} strType
 * @param {Fun} fun
 */
function AddEvent(element, strType, fun) {
    //判断浏览器有没有addEventListener方法
    if (element.addEventListener) {
        element.addEventListener(strType, fun, false);
        //判断浏览器有没 有attachEvent IE8的方法
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + strType, fun);
        //如果都没有则使用 元素.事件属性这个基本方法
    }
    else {
        element["on" + strType] = fun;
    }
}
/**
 * 为元素解绑监听事件
 * @param {Element}  element ---注册事件元素对象
 * @param {String}   strType ---注册事件名(不加on 如"click")
 * @param {Function} fun	 ---回调函数
 *
 */
function myRemoveEvent(element, strType, fun) {
    //判断浏览器有没有addEventListener方法
    if (element.addEventListener) {
        // addEventListener方法专用删除方法
        element.removeEventListener(strType, fun, false);
        //判断浏览器有没有attachEvent IE8的方法
    }
    else if (element.attachEvent) {
        // attachEvent方法专用删除事件方法
        element.detachEvent("on" + strType, fun);
        //如果都没有则使用 元素.事件属性这个基本方法
    }
    else {
        //删除事件用null
        element["on" + strType] = null;
    }
}
function loadStyle(href, id = null) {
    let style = document.createElement("link");
    if (id)
        style.id = id;
    style.type = "text/css";
    style.rel = "stylesheet";
    style.href = href;
    document.head.appendChild(style);
}
function updateStyle(id, href) {
    let style = document.getElementById(id);
    if (style) {
        style.setAttribute("href", href);
    }
    else {
        loadStyle(href, id);
    }
}
function loadScript(src, type = "module", async = false, defer = false) {
    const script = document.createElement("script");
    if (type)
        script.type = type;
    if (async)
        script.async = true;
    if (defer)
        script.defer = true;
    script.src = src;
    document.head.appendChild(script);
    return script;
}
function addURLParam(url, param = {
    v: window.siyuan?.config.appearance.themeVer,
}) {
    let new_url;
    switch (true) {
        case url.startsWith("//"):
            new_url = new URL(`https:${url}`);
            break;
        case url.startsWith("http://"):
        case url.startsWith("https://"):
            new_url = new URL(url);
            break;
        case url.startsWith("/"):
            new_url = new URL(url, window.location.origin);
            break;
        default:
            new_url = new URL(url, window.location.origin + window.location.pathname);
            break;
    }
    for (let [key, value] of Object.entries(param)) {
        new_url.searchParams.set(key, value);
    }
    switch (true) {
        case url.startsWith("//"):
            return new_url.href.substring(new_url.protocol.length);
        case url.startsWith("http://"):
        case url.startsWith("https://"):
            return new_url.href;
        case url.startsWith("/"):
            return new_url.href.substring(new_url.origin.length);
        default:
            return new_url.href.substring((window.location.origin + window.location.pathname).length);
    }
}

exports.AddEvent = AddEvent;
exports.RangeLimitedInt = RangeLimitedInt;
exports.addURLParam = addURLParam;
exports.compareVersion = compareVersion;
exports.getThemeMode = getThemeMode;
exports.isEmpty = isEmpty;
exports.isEmptyString = isEmptyString;
exports.isPromise = isPromise;
exports.loadScript = loadScript;
exports.loadStyle = loadStyle;
exports.myRemoveEvent = myRemoveEvent;
exports.removejscssfile = removejscssfile;
exports.sleep = sleep;
exports.updateStyle = updateStyle;
