/*!
* sofill v1.1.1
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
import { e as isSillotPhoneAppMode } from './index-84442f55.js';

function bad(m, head) {
    if (isSillotPhoneAppMode()) {
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
    if (isSillotPhoneAppMode()) {
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
    if (isSillotPhoneAppMode()) {
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
    if (isSillotPhoneAppMode()) {
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
    if (isSillotPhoneAppMode()) {
        console.log(m);
        return;
    }
    const t = typeof m === "string" ? "%s" : "%o";
    console.log("%c" + t, "color:#858585;font-size: 12px", m);
}
function ops(m, head) {
    if (isSillotPhoneAppMode()) {
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
    if (isSillotPhoneAppMode()) {
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
    if (isSillotPhoneAppMode()) {
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
    if (isSillotPhoneAppMode()) {
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
    if (isSillotPhoneAppMode()) {
        console.log(m);
        return;
    }
    const t = typeof m === "string" ? "%s" : "%o";
    console.log("%c%s%c" + t, "padding: 2px 4px;margin: 2px;background: orange;color: white;border-radius: 2px;font-size: 16px", (new Error()).stack.split("\n")[2].trim().split(" ")[1], "padding: 2px 4px;color: #1BA1E2;font-size: 16px", m);
    additionalMessages.forEach(message => {
        console.log(message);
    });
}
function unsure(m, head) {
    if (isSillotPhoneAppMode()) {
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
    if (isSillotPhoneAppMode()) {
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
    if (isSillotPhoneAppMode()) {
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

export { success as a, bad as b, tracker as c, wink as d, error as e, good as g, info as i, log as l, ops as o, print as p, slog as s, table as t, unsure as u, warn as w };
