/*!
* sofill v1.0.48
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
export { C as CopyDOM, b as MoveChildren, M as MoveDOM, a as addinsertCreateElement, c as bodyAC, f as bodyCC, e as bodyRC, d as diguiTooONE, j as eRemoveProperty, h as eSetProperty, g as getActualWidthOfChars, i as insertCreateAfter } from '../../index-3411998c.js';
import { i as isEmptyString, l as localforageExports } from '../../index-73c21370.js';
export { A as AddEvent, R as RangeLimitedInt, f as addURLParam, c as compareVersion, g as getThemeMode, b as isEmpty, a as isPromise, e as loadScript, d as loadStyle, m as myRemoveEvent, r as removejscssfile, s as sleep, u as updateStyle } from '../../index-73c21370.js';
import { p as parseResponse, a as post2Siyuan } from '../../index-fcc560d0.js';
export { g as genUUID, i as isMobile, b as isWindow } from '../../index-fcc560d0.js';

// export class LimitPromise {
//   constructor(max) {
//     // 异步任务“并发”上限
//     this._max = max;
//     // 当前正在执行的任务数量
//     this._count = 0;
//     // 等待执行的任务队列
//     this._taskQueue = [];
//   }
//   /**
//    * 调用器，将异步任务函数和它的参数传入
//    * @param caller 异步任务函数，它必须是async函数或者返回Promise的函数
//    * @param args 异步任务函数的参数列表
//    * @returns {Promise<unknown>} 返回一个新的Promise
//    */
//   call(caller, ...args) {
//     return new Promise((resolve, reject) => {
//       const task = this._createTask(caller, args, resolve, reject);
//       if (this._count >= this._max) {
//         // console.log('count >= max, push a task to queue')
//         this._taskQueue.push(task);
//       } else {
//         task();
//       }
//     });
//   }
//   /**
//    * 创建一个任务
//    * @param caller 实际执行的函数
//    * @param args 执行函数的参数
//    * @param resolve
//    * @param reject
//    * @returns {Function} 返回一个任务函数
//    * @private
//    */
//   _createTask(caller, args, resolve, reject) {
//     return () => {
//       // 实际上是在这里调用了异步任务，并将异步任务的返回（resolve和reject）抛给了上层
//       caller(...args)
//         .then(resolve)
//         .catch(reject)
//         .finally(() => {
//           // 任务队列的消费区，利用Promise的finally方法，在异步任务结束后，取出下一个任务执行
//           this._count--;
//           if (this._taskQueue.length) {
//             // console.log('a task run over, pop a task to run')
//             let task = this._taskQueue.shift();
//             task();
//           } else {
//             // console.log('task count = ', count)
//           }
//         });
//       this._count++;
//       // console.log('task run , task count = ', count)
//     };
//   }
// }
// export class LocalStorage {
//   constructor(max) {
//     // 请求上限
//     this._MAX = max;
//     // 核心控制器
//     this.limitP = new LimitPromise(this._MAX);
//   }
//   async getItem(key, cb = null) {
//     return await this.limitP.call(this.GetItem, key);
//   }
//   async setItem(key, value, cb = null) {
//     return await this.limitP.call(this.SetItem, key, value, cb);
//   }
//   async removeItem(key, cb = null) {
//     return await this.limitP.call(this.RemoveItem, key, cb);
//   }
//   async GetItem(key) {
//     if (key) {
//       return await localforage?.getItem(key).catch(function (err) {
//         // 当出错时，此处代码运行
//         console.warn(err);
//       });
//     } else {
//       console.error(
//         "Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'getItem')"
//       );
//       return;
//     }
//   }
//   async SetItem(key, value, cb) {
//     return await localforage
//       ?.setItem(key, value)
//       .then(function (r) {
//         // 当值被存储后，可执行其他操作
//         console.log(r);
//         if (typeof cb === "function") {
//           cb;
//         }
//       })
//       .catch(function (err) {
//         // 当出错时，此处代码运行
//         console.warn(err);
//       });
//   }
//   async RemoveItem(key, cb) {
//     return await localforage
//       ?.removeItem(key)
//       .then(() => {
//         // 当值被移除后，此处代码运行
//         console.log("Key is cleared!");
//         if (typeof cb === "function") {
//           cb;
//         }
//       })
//       .catch(function (err) {
//         // 当出错时，此处代码运行
//         console.warn(err);
//       });
//   }
// }
const getNewValueFromDomByID = async (id) => {
    let obj = document.getElementById(id);
    if (obj.type === "checkbox" || obj.type === "radio") {
        return obj.checked;
    }
    else {
        return obj.value;
    }
};
async function initAllPropFromIDBAsync(dom) {
    // 遍历所有子元素，判断 prop ，取代 propInit 和 checkedInit，绑定但是不回调（与change函数冲突）
    // 目前的问题是加载时没有等待getItem从IDB获取到值而是先setItem覆盖了IDB的值，解决方案：proxy(回调) -> bind -> init
    // 专门为CP这种包含大量配置DOM设计的，propInit 和 checkedInit 整合为 initPropAndBindFromIDBAsync 单点初始化并绑定
    // Object.defineProperty 拦截的是对象的属性，会改变原对象。proxy 是拦截整个对象，通过 new 生成一个新对象，不会改变原对象。
    // Proxy是对整个对象的代理，而Object.defineProperty只能代理某个属性。
    // 对象上新增属性，Proxy可以监听到，Object.defineProperty不能。
    // 若对象内部属性要全部递归代理，Proxy可以只在调用的时候递归，而Object.definePropery需要一次完成所有递归，性能比Proxy差。
    // https://es6.ruanyifeng.com/#docs/proxy
    const _bind = async (id) => {
        let DOM = document.getElementById(id); // 获取dom
        let prop = "bindIDB"; // 绑定的属性
        let isCheckbox = DOM.type === "checkbox";
        Object.defineProperty(DOM, prop, {
            get: () => {
                if (isCheckbox) {
                    return DOM.checked;
                }
                else {
                    return DOM.value;
                }
            },
            set: function (value) {
                if (isCheckbox) {
                    DOM.checked = value === "true" ? true : false;
                }
                else {
                    DOM.value = value;
                }
                localforageExports.setItem(id, value);
                return true;
            },
            configurable: true,
        });
        // window.obj3 = watchOut(
        //   { name: { second: "99" } },
        //   {
        //     beforeRead(target, property) {
        //       console.log(target, property, "beforeRead");
        //     },
        //     read(target, property) {
        //       console.log("afterRead");
        //     },
        //     beforeUpdated(target, property, value) {
        //       console.log("beforeUpdated");
        //     },
        //     beforeChanged(target, property, value) {
        //       console.log("beforeChanged");
        //     },
        //     updated(target, property, value) {
        //       console.log("updated");
        //     },
        //     changed(target, property, value) {
        //       console.log("changed");
        //     },
        //   }
        // );
        // window.obj3.name.second;
        console.log(`${id} binded successfully`);
    };
    const _checkedInit = async (obj) => {
        if (isEmptyString(obj.id)) {
            console.warn(obj);
            return;
        }
        await _bind(obj.id);
        return localforageExports.getItem(obj.id).then(async (v) => {
            if (!isEmptyString(v)) {
                obj.bindIDB = "true";
            }
            else {
                obj.bindIDB = "false";
            }
            console.log(`${obj.id} inited successfully with value \`${v}\``);
        });
    };
    const _propInit = async (id) => {
        if (isEmptyString(id)) {
            console.warn(id);
            return;
        }
        await _bind(id);
        return localforageExports.getItem(id).then(async (v) => {
            let dom = document.getElementById(id);
            if (!isEmptyString(v)) {
                dom.bindIDB = v;
            }
            else {
                switch (dom.type) {
                    case "select-one":
                    case "select-multiple":
                        dom.bindIDB = dom.options[0].value;
                        break;
                    case "number":
                    case "range":
                        dom.bindIDB = 0;
                        break;
                    default:
                        dom.bindIDB = "";
                        break;
                }
            }
            console.log(`${id} inited successfully with value \`${v}\``);
        });
    };
    const _forEach = async (arr, callback) => {
        const length = arr.length;
        let k = 0;
        while (k < length) {
            await callback(arr[k]);
            k++;
        }
    };
    let childsLength = 0;
    let selectList = dom.querySelectorAll("select:not([id^='NoSync'])");
    let normalInputList = dom.querySelectorAll("input[id^='SC_winsay_cp']:not([type='checkbox'])");
    let checkboxList = dom.querySelectorAll("input[type='checkbox']:not([id^='NoSync'])");
    childsLength += selectList.length;
    childsLength += normalInputList.length;
    childsLength += checkboxList.length;
    console.warn(childsLength);
    window.winsay.cp.awaitInitItem = childsLength;
    await _forEach(selectList, async (dom) => {
        await _propInit(dom.id);
        window.winsay.cp.awaitInitItem -= 1;
        window.winsay.cp.inited += 1;
    });
    await _forEach(normalInputList, async (dom) => {
        await _propInit(dom.id);
        window.winsay.cp.awaitInitItem -= 1;
        window.winsay.cp.inited += 1;
    });
    await _forEach(checkboxList, async (dom) => {
        await _checkedInit(dom);
        window.winsay.cp.awaitInitItem -= 1;
        window.winsay.cp.inited += 1;
    });
    // await selectList?.forEach(async function (value) {
    //   await _propInit(value.id);
    //   childsLength -= 1;
    // });
    // await rangeSliderList?.forEach(async function (value) {
    //   await _propInit(value.id);
    //   childsLength -= 1;
    // });
    // await checkboxList?.forEach(async function (obj) {
    //   await _checkedInit(obj);
    //   childsLength -= 1;
    // });
    // if (childsLength === 0) {
    //   return true;
    // }
}
async function propChange(id, changeFn) {
    let dom = document.getElementById(id);
    // await changeFn(dom.bindIDB);
    dom.addEventListener("change", async (e) => {
        if (typeof changeFn === "function") {
            // tips: e.target == dom
            await changeFn(e.target.bindIDB);
        }
    });
    window.winsay.cp.listened += 1;
    console.log(`${id} listen successfully`);
}
async function checkedChange(obj, YesFn, NoFn) {
    // if (obj.checked && obj.checked === true) {
    //   YesFn();
    // } else {
    //   NoFn();
    // }
    obj.addEventListener("click", async () => {
        if (obj.checked && obj.checked === true) {
            YesFn();
        }
        else {
            NoFn();
        }
    });
    window.winsay.cp.listened += 1;
    console.log(`${obj.id} listen successfully`);
}
// async function bindDomWithObject(options) {
//   var dom = document.getElementById(options.id); // 获取dom
//   var obj = options.obj; // 需要绑定的obj
//   var prop = options.prop; // 需要绑定的obj 的属性
//   var callback = options.callback; // 绑定成功后调用
//   var type = options.type; // 绑定的事件类型
//   var updated = options.updated; // 更新成功后调用
//   Object.defineProperty(obj, prop, {
//     get: () => {
//       return dom.value;
//     },
//     set: async function (value) {
//       dom.value = value;
//       await localforage.setItem(prop, value);
//     },
//     configurable: true,
//   });
//   dom.addEventListener(type, () => {
//     obj[prop] = obj[prop];
//     if (typeof updated === "function") {
//       updated(obj, prop, dom); // 传入对象， 修改的属性， 以及dom节点
//     }
//   });
//   if (typeof callback === "function") {
//     callback(options, obj, dom);
//   }
//   console.log(`${options.id} binded successfully`);
// }
// export async function propInit(id, type) {
//   bindDomWithObject({
//     id: id,
//     obj: obj,
//     prop: id,
//     type: type,
//     callback: async function (options, obj) {
//       localforage.getItem(id).then((v) => {
//         if (!isEmptyString(v)) {
//           obj[options.prop] = v;
//         }
//         console.log(`${id} binded successfully with inited value ${v}`);
//       });
//     },
//   });
// }
// export async function checkedInit(obj) {
//   let v = await localforage.getItem(obj.id);
//   if (!isEmptyString(v)) {
//     if (v === "true") {
//       obj.checked = true;
//     } else {
//       obj.checked = false;
//     }
//   } else {
//     obj.checked = false;
//   }
//   console.log(`${obj.id} binded successfully with inited value ${v}`);
// }
const SofillDate = {
    isDuringDate: function (beginDateStr, endDateStr) {
        var curDate = new Date();
        var beginDate = new Date(beginDateStr);
        var endDate = new Date(endDateStr);
        if (curDate >= beginDate && curDate <= endDate) {
            return true;
        }
        return false;
    },
    isDuringTime: function (beginTimeStr, endTimeStr) {
        var curDate = new Date();
        var beginDate = new Date(`${curDate.getFullYear()}-${curDate.getMonth() + 1}-${curDate.getDate()} ${beginTimeStr}`);
        var endDate = new Date(`${curDate.getFullYear()}-${curDate.getMonth() + 1}-${curDate.getDate()} ${endTimeStr}`);
        if (beginDate <= endDate) {
            if (beginDate <= curDate && curDate <= endDate) {
                return true;
            }
        }
        else if (beginDate <= curDate || curDate <= endDate) {
            return true;
        }
        return false;
    },
};
function getUrlParam(urlStr, urlKey) {
    const url = new URL(urlStr); // 字符串转换成url格式
    const paramsStr = url.search.slice(1); // 获取'?'后面的参数字符串
    const paramsArr = paramsStr.split("&"); // 分割'&'字符 获得参数数组
    for (let i = 0; i < paramsArr.length; i++) {
        const tempArr = paramsArr[i].split("=");
        if (tempArr[0] === urlKey) {
            return tempArr[1];
        }
    }
}
function getUrlParams(urlStr) {
    const url = new URL(urlStr); // 字符串转换成url格式
    const paramsStr = url.search.slice(1); // 获取'?'后面的参数字符串
    const paramsArr = paramsStr.split("&"); // 分割'&'字符 获得参数数组
    return paramsArr;
}

/**
 * 计算当前节点应使用的提示信息的朝向
 * @params {HTMLElement} element: 当前节点
 * @return {string}: 提示标签方向类
 */
function getTooltipDirection(element) {
    const rect = element.getBoundingClientRect();
    const left = rect.left + rect.width / 2;
    const top = rect.top + rect.height / 2;
    const threshold_w = (1 * document.documentElement.offsetWidth) / 3;
    const threshold_e = (2 * document.documentElement.offsetWidth) / 3;
    const threshold_n = (1 * document.documentElement.offsetHeight) / 3;
    const threshold_s = (2 * document.documentElement.offsetHeight) / 3;
    let tooltips_class;
    switch (true) {
        case top < threshold_n && left < threshold_w:
            tooltips_class = "b3-tooltips__se";
            break;
        case top < threshold_n && left >= threshold_w && left <= threshold_e:
            tooltips_class = "b3-tooltips__s";
            break;
        case top < threshold_n && left > threshold_e:
            tooltips_class = "b3-tooltips__sw";
            break;
        case top >= threshold_n && top <= threshold_s && left < threshold_w:
            tooltips_class = "b3-tooltips__e";
            break;
        case top >= threshold_n &&
            top <= threshold_s &&
            left >= threshold_w &&
            left <= threshold_e:
            tooltips_class = "b3-tooltips__s";
            break;
        case top >= threshold_n && top <= threshold_s && left > threshold_e:
            tooltips_class = "b3-tooltips__w";
            break;
        case top > threshold_s && left < threshold_w:
            tooltips_class = "b3-tooltips__ne";
            break;
        case top > threshold_s && left >= threshold_w && left <= threshold_e:
            tooltips_class = "b3-tooltips__n";
            break;
        case top > threshold_s && left > threshold_e:
            tooltips_class = "b3-tooltips__nw";
            break;
    }
    return tooltips_class;
}
/**
 * 设置提示信息朝向方向
 * @params {function} classname: 获得元素的标签类名
 * @params {array} items: DOM 元素数组
 */
function setTooltipDirection(classname, ...items) {
    const tooltips_class_list = [
        "b3-tooltips__nw",
        "b3-tooltips__n",
        "b3-tooltips__ne",
        "b3-tooltips__e",
        "b3-tooltips__se",
        "b3-tooltips__s",
        "b3-tooltips__sw",
        "b3-tooltips__w",
    ];
    items.forEach((item) => {
        item.classList.remove(...tooltips_class_list);
        item.classList.add(classname(item));
    });
}

/**
 * 获得焦点所在的块
 * @return {HTMLElement} 光标所在块
 * @return {null} 光标不在块内
 */
function getFocusedBlock() {
    if (document.activeElement.classList.contains("protyle-wysiwyg")) {
        /* 光标在编辑区内 */
        let block = window.getSelection()?.focusNode?.parentElement; // 当前光标
        while (block != null && block?.dataset?.nodeId == null)
            block = block.parentElement;
        return block;
    }
    else
        return null;
}
/**
 * 获得焦点所在块 ID
 * @return {string} 块 ID
 * @return {null} 光标不在块内
 */
function getFocusedBlockID() {
    let block = getFocusedBlock();
    if (block) {
        return block.dataset.nodeId;
    }
    else
        return null;
}
/**
 * 获得焦点所在文档
 * @return {HTMLElement} 焦点所在文档
 * @return {null} 没有聚焦的文档
 */
function getFocusedDoc() {
    /* 点击按钮后焦点就发生了变化, 不能通过 document.activeElement 获取文档 */
    // const wysiwyg = document.activeElement;
    // return wysiwyg.classList.contains('protyle-wysiwyg')
    //     ? wysiwyg
    //     : null;
    return (document.querySelector("div.layout__wnd--active div.protyle:not(.fn__none) > div.protyle-content > div.protyle-wysiwyg[data-doc-type]") ||
        document.querySelector("#editor > div.protyle-content >  div.protyle-wysiwyg[data-doc-type]") ||
        null);
}
/**
 * 获得焦点所在文档的背景
 * @return {HTMLElement} 焦点所在文档的背景
 * @return {null} 没有聚焦的文档
 */
function getFocusedDocBackground() {
    // return document.querySelector('div.layout__wnd--active div.protyle:not(.fn__none) > div.protyle-content > div.protyle-background')
    //     || document.querySelector('#editor > div.protyle-content > div.protyle-background')
    //     || null;
    const wysiwyg = getFocusedDoc();
    // console.log(wysiwyg);
    var background = wysiwyg;
    while (background != null &&
        background.classList.contains("protyle-background") === false)
        background = background.previousElementSibling;
    return background ? background : null;
}
/**
 * 获得焦点所在文档的 ID
 * @return {string} 文档 ID
 * @return {null} 没有聚焦的文档
 */
function getFocusedDocID() {
    let background = getFocusedDocBackground();
    // console.log(background);
    if (background) {
        return background.dataset.nodeId;
    }
    else
        return null;
}
/**
 * 获得焦点所在的块 ID, 否则获得焦点所在文档的 ID
 * @return {string} 块 ID 或文档 ID
 * @return {null} 光标不在块内或文档内
 */
function getFocusedID() {
    return getFocusedBlockID() || getFocusedDocID() || null;
}

var Account = {};

var AI = {};

var Asset = {};

var Query = {
    sql: querySQL,
};
async function querySQL(sql) {
    let sqldata = {
        stmt: sql,
    };
    let url = "/api/query/sql";
    return parseResponse(post2Siyuan(url, sqldata));
}

var Attr = {
    getBlockAttrs,
    setBlockAttrs,
    queryBlockById,
};
async function getBlockAttrs(内容块id) {
    let data = {
        id: 内容块id,
    };
    let url = "/api/attr/getBlockAttrs";
    return parseResponse(post2Siyuan(url, data));
}
async function queryBlockById(内容块id) {
    let sql = `select * from blocks where id ='${内容块id}'`;
    let data = await querySQL(sql);
    return data[0];
}
async function setBlockAttrs(内容块id, 属性对象) {
    let url = "/api/attr/setBlockAttrs";
    return parseResponse(post2Siyuan(url, {
        id: 内容块id,
        attrs: 属性对象,
    }));
}

var Av = {};

var Bazaar = {
    getBazaarTheme,
    getInstalledTheme,
};
async function getBazaarTheme(ip, data) {
    let url = "http://" + ip + "/api/bazaar/getBazaarTheme";
    return post2Siyuan(url, data);
}
async function getInstalledTheme(ip, data) {
    let url = "http://" + ip + "/api/bazaar/getInstalledTheme";
    return post2Siyuan(url, data);
}

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
    return parseResponse(post2Siyuan(url, data));
}
async function 获取块面包屑(ID) {
    const data = {
        id: ID,
    };
    const url = "/api/block/getBlockBreadcrumb";
    return parseResponse(post2Siyuan(url, data));
}
async function 插入块(previousID, dataType, data) {
    let url = "/api/block/insertBlock";
    return parseResponse(post2Siyuan((url = url), (data = {
        previousID: previousID,
        dataType: dataType,
        data: data,
    })));
}
async function 插入前置子块(parentID, dataType, data) {
    let url = "/api/block/prependBlock";
    return parseResponse(post2Siyuan((url = url), (data = {
        parentID: parentID,
        dataType: dataType,
        data: data,
    })));
}
async function 插入后置子块(parentID, dataType, data) {
    let url = "/api/block/appendBlock";
    return parseResponse(post2Siyuan((url = url), (data = {
        parentID: parentID,
        dataType: dataType,
        data: data,
    })));
}
async function 更新块(id, dataType, data) {
    let url = "/api/block/updateBlock";
    return parseResponse(post2Siyuan((url = url), (data = {
        id: id,
        dataType: dataType,
        data: data,
    })));
}
async function 删除块(id) {
    let url = "/api/block/deleteBlock";
    return parseResponse(post2Siyuan(url, {
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
    return parseResponse(post2Siyuan(url, data));
    //文档hepath与Markdown 内容
}

async function getFile(path) {
    const response = await fetch("/api/file/getFile", {
        method: "POST",
        headers: {
            Authorization: `Token ${window.siyuan?.config.api.token}`,
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
async function putFile(path, filedata, isDir = false, modTime = Date.now()) {
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
            Authorization: `Token ${window.siyuan?.config.api.token}`,
        },
    });
    if (response.status === 200)
        return await response.json();
    else
        return null;
}

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getFile: getFile,
    putFile: putFile
});

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
    return parseResponse(post2Siyuan(url, data));
    //返回空数据
}
async function 删除思源文档(笔记本id, 文档路径) {
    let data = {
        notebook: 笔记本id,
        path: 文档路径,
    };
    let url = "/api/filetree/removeDoc";
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
    //返回空数据
}
async function 根据思源路径获取人类可读路径(笔记本ID, 路径) {
    let data = {
        Notebook: 笔记本ID,
        Path: 路径,
    };
    let url = "/api/filetree/getHPathByPath";
    return parseResponse(post2Siyuan(url, data));
    //返回路径
}
async function 根据块ID查询文档人类可读完整路径(ID) {
    let data = {
        id: ID,
    };
    let url = "/api/filetree/getHPathByID";
    return parseResponse(post2Siyuan(url, data));
}
async function 通过markdown创建文档(notebook, path, markdown) {
    let data = {
        notebook: notebook,
        path: path,
        markdown: markdown,
    };
    let url = "/api/filetree/createDocWithMd";
    return parseResponse(post2Siyuan(url, data));
}
async function 列出指定路径下文档(路径) {
    let data = {
        path: 路径,
    };
    let url = "/api/filetree/listDocsByPath";
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
}
async function 以关键词搜索文档(k) {
    let data = {
        k: k,
    };
    let url = "/api/filetree/searchDocs";
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
}
async function 获取全局图谱(k, conf, reqId) {
    let data = {
        k: k,
        conf: conf,
        reqId: reqId,
    };
    let url = "/api/graph/getGraph";
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
    //返回空数据
}
async function 关闭思源笔记本(笔记本id) {
    let data = {
        notebook: 笔记本id,
    };
    let url = "/api/notebook/closeNotebook";
    return parseResponse(post2Siyuan(url, data));
    //返回空数据
}
async function 重命名思源笔记本(笔记本id, 笔记本的新名称) {
    let data = {
        notebook: 笔记本id,
        name: 笔记本的新名称,
    };
    let url = "/api/notebook/renameNotebook";
    return parseResponse(post2Siyuan(url, data));
    //返回空数据
}
async function 新建思源笔记本(笔记本名称) {
    let data = {
        name: 笔记本名称,
    };
    let url = "/api/notebook/createNotebook";
    return parseResponse(post2Siyuan(url, data));
    //返回空数据
}
async function 删除思源笔记本(笔记本id) {
    let data = { notebook: 笔记本id };
    let url = "/api/notebook/removeNotebook";
    return parseResponse(post2Siyuan(url, data));
    //返回空数据
}
async function 获取思源笔记本配置(笔记本id) {
    let data = { notebook: 笔记本id };
    let url = "/api/notebook/getNotebookConf";
    return parseResponse(post2Siyuan(url, data));
    //返回笔记本配置
}
async function 保存思源笔记本配置(笔记本id) {
    let data = { notebook: 笔记本id };
    let url = "/api/notebook/setNotebookConf";
    return parseResponse(post2Siyuan(url, data));
    //返回笔记本配置
}

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

var Outline = {
    getDocOutline: 以id获取文档大纲,
};
async function 以id获取文档大纲(文档id) {
    let data = {
        id: 文档id,
    };
    let url = "/api/outline/getDocOutline";
    return parseResponse(post2Siyuan(url, data));
}

var Ref = {
    getBacklink: getBacklink,
};
async function getBacklink(id) {
    let data = {
        id: id,
        beforeLen: 10,
        k: "",
        mk: "",
    };
    let url = "/api/ref/getBacklink";
    return parseResponse(post2Siyuan(url, data));
}

var Repo = {};

var Riff = {};

var Search = {
    searchEmbedBlock: queryEmbedBlock,
    searchBlock: queryBlock,
    searchTemplate: queryTemplate,
};
async function queryEmbedBlock(ids, sql) {
    let data = {
        stmt: sql,
        excludeIDs: ids,
    };
    let url = "/api/search/searchEmbedBlock";
    return parseResponse(post2Siyuan(url, data));
}
async function queryBlock(query) {
    let data = {
        query: query,
    };
    let url = "/api/search/searchBlock";
    return parseResponse(post2Siyuan(url, data));
}
async function queryTemplate(k) {
    let data = {
        k: k,
    };
    let url = "/api/search/searchTemplate";
    return parseResponse(post2Siyuan(url, data));
}

var Setting = {};

var Snippet = {};

var Storage = {};

var Sync = {};

var System = {};

var Tag = {
    getTag,
};
async function getTag() {
    let data = {};
    let url = "/api/tag/getTag";
    return parseResponse(post2Siyuan(url, data));
}

var Template = {
    docSaveAsTemplate,
    renderTemplate,
};
async function docSaveAsTemplate(id, overwrite = false) {
    let url = "/api/template/docSaveAsTemplate";
    let data = {
        id: id,
        overwrite: overwrite,
    };
    return parseResponse(post2Siyuan(url, data));
}
async function renderTemplate(data) {
    let url = "/api/template/render";
    return parseResponse(post2Siyuan(url, data));
}

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

export { AI, Account, Asset, Attr, Av, Bazaar, Block, Bookmark, Export, index as File, Filetree, Format, Graph, History, Import, Inbox, Lute, Notebook, Outline, Query, Ref, Repo, Riff, Search, Setting, Snippet, SofillDate, Storage, Sync, System, Tag, Template, checkedChange, getBazaarTheme, getFocusedBlock, getFocusedBlockID, getFocusedDoc, getFocusedDocBackground, getFocusedDocID, getFocusedID, getInstalledTheme, getNewValueFromDomByID, getTooltipDirection, getUrlParam, getUrlParams, initAllPropFromIDBAsync, insertCreateBefore, isEmptyString, parseResponse, post2Siyuan, propChange, pushMessage, querySQL, setTooltipDirection, 通知 };
