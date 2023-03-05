/*!
* sofill v1.0.10
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
import { apitoken } from './config.mjs';

function 通知(text, timeout = 7000) {
    var url = "http://127.0.0.1:6806/api/notification/pushMsg";
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    var obj = {
        msg: text,
        timeout: 7000,
    };
    httpRequest.send(JSON.stringify(obj));
    // 响应后的回调函数
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var json = httpRequest.responseText;
            console.log(json);
        }
    };
}
/**
 * @deprecated 过时的
 */
function pushMessage(text) {
    var url = "http://127.0.0.1:6806/api/notification/pushMsg";
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    var obj = {
        msg: text,
        timeout: 7000,
    };
    httpRequest.send(JSON.stringify(obj));
    // 响应后的回调函数
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var json = httpRequest.responseText;
            console.log(json);
        }
    };
}

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
//判断字符是否为空
function isEmpty(obj) {
    return (typeof obj === "undefined" || obj === null || obj === "" || obj === "null");
}
function RangeLimitedInt(min, value1, max) {
    var v1 = parseInt(min, 10);
    var v2 = parseInt(value1, 10);
    var v3 = parseInt(max, 10);
    var vmin = v2 < v3 ? v2 : v3;
    var vmax = v1 > vmin ? v1 : vmin;
    return vmax;
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

var Account = {};

var Asset = {};

async function 向思源请求数据(url, data) {
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
async function 解析响应体(response) {
    let r = await response;
    // console.log(r)
    return r.code === 0 ? r.data : null;
}

var Query = {
    sql: 以sql向思源请求块数据,
};
async function 以sql向思源请求块数据(sql) {
    let sqldata = {
        stmt: sql,
    };
    let url = "/api/query/sql";
    return 解析响应体(向思源请求数据(url, sqldata));
}

var Attr = {
    getBlockAttrs: 以id获取思源块属性,
    setBlockAttrs: 设置思源块属性,
    getBlockByID: 以id获取思源块信息,
};
async function 以id获取思源块属性(内容块id) {
    let data = {
        id: 内容块id,
    };
    let url = "/api/attr/getBlockAttrs";
    return 解析响应体(向思源请求数据(url, data));
}
async function 以id获取思源块信息(内容块id) {
    let sql = `select * from blocks where id ='${内容块id}'`;
    let data = await 以sql向思源请求块数据(sql);
    return data[0];
}
async function 设置思源块属性(内容块id, 属性对象) {
    let url = "/api/attr/setBlockAttrs";
    return 解析响应体(向思源请求数据(url, {
        id: 内容块id,
        attrs: 属性对象,
    }));
}

var Av = {};

var Bazaar = {};

var Block = {
    getBlockKramdown: 获取块kramdown源码,
    getBlockBreadcrumb: 获取块面包屑,
    insertBlock: 插入块,
    prependBlock: 插入前置子块,
    appendBlock: 插入后置子块,
    deleteBlock: 删除块,
    updateBlock: 更新块,
};
async function 获取块kramdown源码(内容块id) {
    const data = {
        id: 内容块id,
    };
    const url = "/api/block/getBlockKramdown";
    return 解析响应体(向思源请求数据(url, data));
}
async function 获取块面包屑(ID) {
    const data = {
        id: ID,
    };
    const url = "/api/block/getBlockBreadcrumb";
    return 解析响应体(向思源请求数据(url, data));
}
async function 插入块(previousID, dataType, data) {
    let url = "/api/block/insertBlock";
    return 解析响应体(向思源请求数据((url = url), (data = {
        previousID: previousID,
        dataType: dataType,
        data: data,
    })));
}
async function 插入前置子块(parentID, dataType, data) {
    let url = "/api/block/prependBlock";
    return 解析响应体(向思源请求数据((url = url), (data = {
        parentID: parentID,
        dataType: dataType,
        data: data,
    })));
}
async function 插入后置子块(parentID, dataType, data) {
    let url = "/api/block/appendBlock";
    return 解析响应体(向思源请求数据((url = url), (data = {
        parentID: parentID,
        dataType: dataType,
        data: data,
    })));
}
async function 更新块(id, dataType, data) {
    let url = "/api/block/updateBlock";
    return 解析响应体(向思源请求数据((url = url), (data = {
        id: id,
        dataType: dataType,
        data: data,
    })));
}
async function 删除块(id) {
    let url = "/api/block/deleteBlock";
    return 解析响应体(向思源请求数据(url, {
        id: id,
    }));
}

var Bookmark = {};

var Export = {
    exportMdContent: 以id获取文档块markdown,
};
async function 以id获取文档块markdown(文档id) {
    let data = {
        id: 文档id,
    };
    let url = "/api/export/exportMdContent";
    return 解析响应体(向思源请求数据(url, data));
    //文档hepath与Markdown 内容
}

var _File = {
    getFile: 获取文件,
    putFile: 写入文件,
};
async function 获取文件(path) {
    const response = await fetch("/api/file/getFile", {
        method: "POST",
        headers: {
            Authorization: `Token ${apitoken}`,
        },
        body: JSON.stringify({
            path: path,
        }),
    });
    if (response.status === 200)
        return response;
    else
        return null;
}
async function 写入文件(path, filedata, isDir = false, modTime = Date.now()) {
    let blob = new Blob([filedata]);
    let file = new File([blob], path.split("/").pop());
    let formdata = new FormData();
    formdata.append("path", path);
    formdata.append("file", file);
    formdata.append("isDir", isDir.toString());
    formdata.append("modTime", modTime.toString());
    const response = await fetch("/api/file/putFile", {
        body: formdata,
        method: "POST",
        headers: {
            Authorization: `Token ${apitoken}`,
        },
    });
    if (response.status === 200)
        return await response.json();
    else
        return null;
}

var Filetree = {
    createDocWithMd: 通过markdown创建文档,
    removeDoc: 删除思源文档,
    renameDoc: 重命名思源文档,
    moveDoc: 移动思源文档,
    getHPathByPath: 根据思源路径获取人类可读路径,
    getHPathByID: 根据块ID查询文档人类可读完整路径,
    listDocsByPath: 列出指定路径下文档,
    getDoc: 以id获取文档内容,
    searchDocs: 以关键词搜索文档,
};
async function 重命名思源文档(笔记本id, 文档路径, 文档新标题) {
    let data = {
        notebook: 笔记本id,
        path: 文档路径,
        title: 文档新标题,
    };
    let url = "/api/filetree/renameDoc";
    return 解析响应体(向思源请求数据(url, data));
    //返回空数据
}
async function 删除思源文档(笔记本id, 文档路径) {
    let data = {
        notebook: 笔记本id,
        path: 文档路径,
    };
    let url = "/api/filetree/removeDoc";
    return 解析响应体(向思源请求数据(url, data));
    //返回空数据
}
async function 移动思源文档(源笔记本ID, 源路径, 目标笔记本ID, 目标路径) {
    let data = {
        fromNotebook: 源笔记本ID,
        fromPath: 源路径,
        toNotebook: 目标笔记本ID,
        toPath: 目标路径,
    };
    let url = "/api/filetree/moveDoc";
    return 解析响应体(向思源请求数据(url, data));
    //返回空数据
}
async function 根据思源路径获取人类可读路径(笔记本ID, 路径) {
    let data = {
        Notebook: 笔记本ID,
        Path: 路径,
    };
    let url = "/api/filetree/getHPathByPath";
    return 解析响应体(向思源请求数据(url, data));
    //返回路径
}
async function 根据块ID查询文档人类可读完整路径(ID) {
    let data = {
        id: ID,
    };
    let url = "/api/filetree/getHPathByID";
    return 解析响应体(向思源请求数据(url, data));
}
async function 通过markdown创建文档(notebook, path, markdown) {
    let data = {
        notebook: notebook,
        path: path,
        markdown: markdown,
    };
    let url = "/api/filetree/createDocWithMd";
    return 解析响应体(向思源请求数据(url, data));
}
async function 列出指定路径下文档(路径) {
    let data = {
        path: 路径,
    };
    let url = "/api/filetree/listDocsByPath";
    return 解析响应体(向思源请求数据(url, data));
    //文档hepath与Markdown 内容
}
async function 以id获取文档内容(id) {
    let data = {
        id: id,
        k: "",
        mode: 2,
        size: 36,
    };
    let url = "/api/filetree/getDoc";
    return 解析响应体(向思源请求数据(url, data));
}
async function 以关键词搜索文档(k) {
    let data = {
        k: k,
    };
    let url = "/api/filetree/searchDocs";
    return 解析响应体(向思源请求数据(url, data));
}

var Format = {};

var Graph = {
    getLocalGraph: 以id获取局部图谱,
    getGraph: 获取全局图谱,
};
async function 以id获取局部图谱(k, id, conf, reqId) {
    let data = {
        id: id,
        k: k,
        conf: conf,
        reqId: reqId,
    };
    let url = "/api/graph/getLocalGraph";
    return 解析响应体(向思源请求数据(url, data));
}
async function 获取全局图谱(k, conf, reqId) {
    let data = {
        k: k,
        conf: conf,
        reqId: reqId,
    };
    let url = "/api/graph/getGraph";
    return 解析响应体(向思源请求数据(url, data));
}

var History = {};

var Import = {};

var Inbox = {};

var Lute = {};

var Notebook = {
    createNotebook: 新建思源笔记本,
    removeNotebook: 删除思源笔记本,
    setNotebookConf: 保存思源笔记本配置,
    getNotebookConf: 获取思源笔记本配置,
    openNotebook: 打开思源笔记本,
    closeNotebook: 关闭思源笔记本,
    renameNotebook: 重命名思源笔记本,
};
async function 打开思源笔记本(笔记本id) {
    let data = {
        notebook: 笔记本id,
    };
    let url = "/api/notebook/openNotebook";
    return 解析响应体(向思源请求数据(url, data));
    //返回空数据
}
async function 关闭思源笔记本(笔记本id) {
    let data = {
        notebook: 笔记本id,
    };
    let url = "/api/notebook/closeNotebook";
    return 解析响应体(向思源请求数据(url, data));
    //返回空数据
}
async function 重命名思源笔记本(笔记本id, 笔记本的新名称) {
    let data = {
        notebook: 笔记本id,
        name: 笔记本的新名称,
    };
    let url = "/api/notebook/renameNotebook";
    return 解析响应体(向思源请求数据(url, data));
    //返回空数据
}
async function 新建思源笔记本(笔记本名称) {
    let data = {
        name: 笔记本名称,
    };
    let url = "/api/notebook/createNotebook";
    return 解析响应体(向思源请求数据(url, data));
    //返回空数据
}
async function 删除思源笔记本(笔记本id) {
    let data = { notebook: 笔记本id };
    let url = "/api/notebook/removeNotebook";
    return 解析响应体(向思源请求数据(url, data));
    //返回空数据
}
async function 获取思源笔记本配置(笔记本id) {
    let data = { notebook: 笔记本id };
    let url = "/api/notebook/getNotebookConf";
    return 解析响应体(向思源请求数据(url, data));
    //返回笔记本配置
}
async function 保存思源笔记本配置(笔记本id) {
    let data = { notebook: 笔记本id };
    let url = "/api/notebook/setNotebookConf";
    return 解析响应体(向思源请求数据(url, data));
    //返回笔记本配置
}

var Notification = {
    pushMsg: 推送消息,
    pushErrMsg: 推送报错消息,
};
const language = window.theme.languageMode;
async function 推送消息(message = null, text = null, timeout = 7000) {
    const url = "/api/notification/pushMsg";
    const data = {
        msg: message ? message[language] || message.other : text,
        timeout: timeout,
    };
    return 解析响应体(向思源请求数据(url, data));
}
async function 推送报错消息(message = null, text = null, timeout = 7000) {
    const url = "/api/notification/pushErrMsg";
    const data = {
        msg: message ? message[language] || message.other : text,
        timeout: timeout,
    };
    return 解析响应体(向思源请求数据(url, data));
}

var Outline = {
    getDocOutline: 以id获取文档大纲,
};
async function 以id获取文档大纲(文档id) {
    let data = {
        id: 文档id,
    };
    let url = "/api/outline/getDocOutline";
    return 解析响应体(向思源请求数据(url, data));
}

var Ref = {
    getBacklink: 以id获取反向链接,
};
async function 以id获取反向链接(id) {
    let data = {
        id: id,
        beforeLen: 10,
        k: "",
        mk: "",
    };
    let url = "/api/ref/getBacklink";
    return 解析响应体(向思源请求数据(url, data));
}

var Repo = {};

var Riff = {};

var Search = {
    searchEmbedBlock: 以sql获取嵌入块内容,
    searchBlock: 以关键词搜索块,
    searchTemplate: 以关键词搜索模板,
};
async function 以sql获取嵌入块内容(外部id数组, sql) {
    let data = {
        stmt: sql,
        excludeIDs: 外部id数组,
    };
    let url = "/api/search/searchEmbedBlock";
    return 解析响应体(向思源请求数据(url, data));
}
async function 以关键词搜索块(query) {
    let data = {
        query: query,
    };
    let url = "/api/search/searchBlock";
    return 解析响应体(向思源请求数据(url, data));
}
async function 以关键词搜索模板(k) {
    let data = {
        k: k,
    };
    let url = "/api/search/searchTemplate";
    return 解析响应体(向思源请求数据(url, data));
}

var Setting = {};

var Snippet = {};

var Storage = {};

var Sync = {};

var System = {};

var Tag = {
    getTag: 获取标签列表,
};
async function 获取标签列表() {
    let data = {};
    let url = "/api/tag/getTag";
    return 解析响应体(向思源请求数据(url, data));
}

var Template = {
    docSaveAsTemplate: 导出模板,
    renderTemplate: 渲染模板,
};
async function 导出模板(id, overwrite = false) {
    let url = "/api/template/docSaveAsTemplate";
    let data = {
        id: id,
        overwrite: overwrite,
    };
    return 解析响应体(向思源请求数据(url, data));
}
async function 渲染模板(data) {
    let url = "/api/template/render";
    return 解析响应体(向思源请求数据(url, data));
}

// import { siyuan } from "./siyuan/index";
// async function 获取系统字体列表() {
//   let url = "/api/system/getSysFonts";
//   return 解析响应体(向思源请求数据(url));
// }
// /**
//  * 获得文本的占用的宽度
//  * @param {*} text 字符串文班
//  * @param {*} font 文本字体的样式
//  * @returns
//  */
// function getTextWidth(text, font) {
//   var canvas =
//     getTextWidth.canvas ||
//     (getTextWidth.canvas = document.createElement("canvas"));
//   var context = canvas.getContext("2d");
//   context.font = font;
//   var metrics = context.measureText(text);
//   return metrics.width;
// }
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
 * 获得所选择的块对应的块 ID
 * @returns {string} 块 ID
 * @returns {
 *     id: string, // 块 ID
 *     type: string, // 块类型
 *     subtype: string, // 块子类型(若没有则为 null)
 * }
 * @returns {null} 没有找到块 ID */
// function getBlockSelected() {
//   let node_list = document.querySelectorAll(
//     ".protyle:not(.fn__none)>.protyle-content .protyle-wysiwyg--select"
//   );
//   if (node_list.length === 1 && node_list[0].dataset.nodeId != null)
//     return {
//       id: node_list[0].dataset.nodeId,
//       type: node_list[0].dataset.type,
//       subtype: node_list[0].dataset.subtype,
//       parentNode: node_list[0].offsetParent,
//     };
//   return null;
// }
/**
 * 向指定元素前创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
function insertCreateBefore(targetElement, addElementTxt, setId = null) {
    if (!targetElement)
        console.error("指定元素对象不存在！");
    if (!addElementTxt)
        console.error("未指定字符串！");
    var element = document.createElement(addElementTxt);
    if (setId)
        element.id = setId;
    targetElement.parentElement.insertBefore(element, targetElement);
    return element;
}
var obj = {};
async function bindDomWithObject(options) {
    var dom = document.getElementById(options.id); // 获取dom id
    var obj = options.obj; // 需要绑定的obj
    var prop = options.prop; // 需要绑定的obj 的属性
    var callback = options.callback; // 绑定成功后调用
    var type = options.type; // 绑定的事件类型
    var updated = options.updated; // 更新成功后调用
    Object.defineProperty(obj, prop, {
        get: function () {
            return dom.value;
        },
        set: function (value) {
            dom.value = value;
            localStorage.setItem(prop, value);
        },
        configurable: true,
    });
    dom.addEventListener(type, function () {
        obj[prop] = obj[prop];
        if (typeof updated === "function") {
            updated(obj, prop, dom); // 传入对象， 修改的属性， 以及dom节点
        }
    });
    if (typeof callback === "function") {
        callback(options, obj, dom);
    }
}
// export async function propInit(id, type) {
//   bindDomWithObject({
//     id: id,
//     obj: obj,
//     prop: id,
//     type: type,
//     callback: function (options, obj, dom) {
//       if (!sofill.Utils.isEmpty(localStorage.getItem(id))) {
//         obj[options.prop] = localStorage.getItem(id);
//       }
//     },
//   });
//   console.log(`${id} binded successfully`);
// }
async function propChange(id, changeFn) {
    bindDomWithObject({
        id: id,
        obj: obj,
        prop: id,
        type: "change",
        updated: changeFn,
    });
    changeFn();
}
async function checkedInit(obj) {
    if (localStorage.getItem(obj.id) === "true") {
        obj.checked = true;
    }
    else {
        obj.checked = false;
    }
    console.log(`${obj.id} binded successfully`);
}
async function checkedChange(obj, YesFn, NoFn) {
    if (obj.checked && obj.checked === true) {
        localStorage.setItem(obj.id, "true");
        YesFn();
    }
    else {
        localStorage.setItem(obj.id, "false");
        NoFn();
    }
    obj.addEventListener("click", function () {
        if (obj.checked === true) {
            localStorage.setItem(obj.id, "true");
            YesFn();
        }
        else {
            localStorage.setItem(obj.id, "false");
            NoFn();
        }
    });
}

export { Account, AddEvent, Asset, Attr, Av, Bazaar, Block, Bookmark, CopyDOM, Export, Filetree, Format, Graph, History, Import, Inbox, Lute, MoveChildren, MoveDOM, Notebook, Notification, Outline, Query, RangeLimitedInt, Ref, Repo, Riff, Search, Setting, Snippet, Storage, Sync, System, Tag, Template, _File, addinsertCreateElement, checkedChange, checkedInit, compareVersion, diguiTooONE, insertCreateAfter, insertCreateBefore, isAppMode, isEmpty, myRemoveEvent, propChange, pushMessage, removejscssfile, 以sql向思源请求块数据, 通知 };
