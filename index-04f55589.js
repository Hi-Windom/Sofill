/*!
* sofill v1.0.22
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
'use strict';

function getActualWidthOfChars(text, options) {
    // ref https://juejin.cn/post/7091990279565082655
    const { size, family = "Microsoft YaHei" } = options;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = `${size}px ${family}`;
    const metrics = ctx.measureText(text);
    const actual = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight);
    return Math.max(metrics.width, actual);
}
/**
 * 向指定父级创建追加一个子元素，并可选添加ID,
 * @param {Element} fatherElement
 * @param {string} addElementTxt 要创建添加的元素标签
 * @param {string} setId
 * @returns addElementObject
 */
function addinsertCreateElement(fatherElement, addElementTxt, setId = null) {
    var element = document.createElement(addElementTxt);
    if (setId)
        element.id = setId;
    fatherElement.appendChild(element);
    return element;
}
/**
 * 向指定元素后创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
function insertCreateAfter(targetElement, addElementTxt, setId = null) {
    var element = document.createElement(addElementTxt);
    if (setId)
        element.id = setId;
    var parent = targetElement.parentNode; //得到父节点
    if (parent.lastChild === targetElement) {
        parent.appendChild(element);
        return element;
    }
    else {
        parent.insertBefore(element, targetElement.nextSibling); //否则，当前节点的下一个节点之前添加
        return element;
    }
}
/**
 * 递归DOM元素查找深度子级的第一个符合条件的元素
 * @param {*} element 要查找DOM元素
 * @param {*} judgeFun 查找函数 : fun(v) return true or false
 * @returns element
 */
function diguiTooONE(element, judgeFun) {
    if (element == null)
        return null;
    if (judgeFun == null)
        return null;
    return digui(element);
    function digui(elem) {
        var child = elem.children;
        if ((child.length = 0))
            return null;
        for (let index = 0; index < child.length; index++) {
            const element2 = child[index];
            if (judgeFun(element2)) {
                return element2;
            }
            else {
                var item = digui(element2);
                if (item == null)
                    continue;
                return item;
            }
        }
        return null;
    }
}
function CopyDOM(from, to) {
    var upperDiv = document.querySelector(from);
    var belowNode = document.querySelector(to);
    var newDom = upperDiv.cloneNode(true);
    belowNode.appendChild(newDom);
}
function MoveDOM(from, to) {
    var upperDiv = document.querySelector(from);
    var belowNode = document.querySelector(to);
    belowNode.appendChild(upperDiv);
}
function MoveChildren(from, to) {
    var upperDiv = document.querySelector(from);
    var upperUl = upperDiv.children;
    var len = upperDiv.childElementCount;
    var belowNode = document.querySelector(to);
    for (var i = 0; i < len; i++) {
        belowNode.appendChild(upperUl[0]);
    }
}

async function post2Siyuan(url, data = {}) {
    let resData = null;
    await fetch(url, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
            Authorization: `Token '${window.siyuan.config.api.token}'`,
        },
    }).then(function (response) {
        resData = response.json();
    });
    console.log(resData);
    return resData;
}
async function parseResponse(response) {
    let r = await response;
    // console.log(r)
    return r.code === 0 ? r.data : null;
}
const isMobile = () => {
    return document.getElementById("sidebar") ? true : false;
};
const isWindow = () => {
    return document.getElementById("toolbar") ? false : true;
};
var Util = {
    // 对外暴露与对内暴露不算重复导出？
    isMobile,
    isWindow,
};

exports.CopyDOM = CopyDOM;
exports.MoveChildren = MoveChildren;
exports.MoveDOM = MoveDOM;
exports.Util = Util;
exports.addinsertCreateElement = addinsertCreateElement;
exports.diguiTooONE = diguiTooONE;
exports.getActualWidthOfChars = getActualWidthOfChars;
exports.insertCreateAfter = insertCreateAfter;
exports.isMobile = isMobile;
exports.isWindow = isWindow;
exports.parseResponse = parseResponse;
exports.post2Siyuan = post2Siyuan;
