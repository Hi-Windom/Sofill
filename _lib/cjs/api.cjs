/*!
* sofill v1.1.10
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
* https://jsr.io/@sisi/sofill
*/
'use strict';

var index$1 = require('../../index-DR7QqU83.js');
var index$2 = require('../../index-D9maxC_R.js');
var index$3 = require('../../index-BEEMuyoS.js');

// import * as idb from "localforage";
class LimitPromise {
    _max;
    _count;
    _taskQueue;
    constructor(max) {
        // 异步任务“并发”上限
        this._max = max;
        // 当前正在执行的任务数量
        this._count = 0;
        // 等待执行的任务队列
        this._taskQueue = [];
    }
    /**
     * 调用器，将异步任务函数和它的参数传入
     * @param caller 异步任务函数，它必须是async函数或者返回Promise的函数
     * @param args 异步任务函数的参数列表
     * @returns {Promise<unknown>} 返回一个新的Promise
     */
    call(caller, ...args) {
        return new Promise((resolve, reject) => {
            const task = this._createTask(caller, args, resolve, reject);
            if (this._count >= this._max) {
                // console.log('count >= max, push a task to queue')
                this._taskQueue.push(task);
            }
            else {
                task();
            }
        });
    }
    /**
     * 创建一个任务
     * @param caller 实际执行的函数
     * @param args 执行函数的参数
     * @param resolve
     * @param reject
     * @returns {Function} 返回一个任务函数
     * @private
     */
    _createTask(caller, args, resolve, reject) {
        return () => {
            // 实际上是在这里调用了异步任务，并将异步任务的返回（resolve和reject）抛给了上层
            caller(...args)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                // 任务队列的消费区，利用Promise的finally方法，在异步任务结束后，取出下一个任务执行
                this._count--;
                if (this._taskQueue.length) {
                    // console.log('a task run over, pop a task to run')
                    const task = this._taskQueue.shift();
                    task();
                }
            });
            this._count++;
            // console.log('task run , task count = ', count)
        };
    }
}
class LocalStorage {
    _DB;
    _DB_version;
    _MAX;
    limitP;
    constructor(max, DB = "sofill", DB_version = 1) {
        this._DB = DB;
        this._DB_version = DB_version;
        // 请求上限
        this._MAX = max;
        // 核心控制器
        this.limitP = new LimitPromise(this._MAX);
    }
    async getItem(key, cb = null) {
        return await this.limitP.call(this.GetItem, key);
    }
    async setItem(key, value, cb = null) {
        return await this.limitP.call(this.SetItem, key, value, cb);
    }
    async removeItem(key, cb = null) {
        return await this.limitP.call(this.RemoveItem, key, cb);
    }
    // async GetItem(key) {
    //   if (key) {
    //     return await idb.getItem(key).catch(function (err) {
    //       // 当出错时，此处代码运行
    //       console.warn(err);
    //     });
    //   } else {
    //     console.error(
    //       "Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'getItem')"
    //     );
    //     return;
    //   }
    // }
    async GetItem(key) {
        if (key) {
            try {
                const db = await index$2.openDB(this._DB, this._DB_version, {
                    upgrade(db) {
                        // 创建一个名为'items'的存储对象
                        db.createObjectStore('items');
                    },
                });
                // 使用事务从'items'存储中获取给定键的值
                const tx = db.transaction('items', 'readonly');
                const store = tx.objectStore('items');
                const value = await store.get(key);
                return value; // 返回获取到的值
            }
            catch (err) {
                // 当出错时，此处代码运行
                console.warn(err);
                return undefined;
            }
        }
        else {
            console.error("Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'getItem')");
            return undefined;
        }
    }
    async SetItem(key, value, cb) {
        if (key) {
            try {
                const db = await index$2.openDB(this._DB, this._DB_version, {
                    upgrade(db) {
                        // 创建一个名为'items'的存储对象
                        db.createObjectStore('items');
                    },
                });
                // 使用事务将值添加到'items'存储中
                const tx = db.transaction('items', 'readwrite');
                const store = tx.objectStore('items');
                await store.put(value, key); // 使用put方法存储键值对
                // 当值被存储后，可执行其他操作
                console.log("Value is stored!");
                if (typeof cb === "function") {
                    cb();
                }
            }
            catch (err) {
                // 当出错时，此处代码运行
                console.warn(err);
            }
        }
        else {
            console.error("Key is not provided.");
        }
    }
    async RemoveItem(key, cb) {
        if (key) {
            try {
                // 打开或创建一个名为'mydb'的数据库，版本为1
                const db = await index$2.openDB(this._DB, this._DB_version, {
                    upgrade(db) {
                        // 创建一个名为'items'的存储对象
                        db.createObjectStore('items');
                    },
                });
                // 使用事务从'items'存储中删除给定键的值
                const tx = db.transaction('items', 'readwrite');
                const store = tx.objectStore('items');
                await store.delete(key); // 使用delete方法删除键对应的值
                // 当值被移除后，此处代码运行
                console.log("Key is cleared!");
                if (typeof cb === "function") {
                    cb();
                }
            }
            catch (err) {
                // 当出错时，此处代码运行
                console.warn(err);
            }
        }
        else {
            console.error("Key is not provided.");
        }
    }
    // async SetItem(key, value, cb) {
    //   return await idb
    //     .setItem(key, value)
    //     .then(function (r) {
    //       // 当值被存储后，可执行其他操作
    //       console.log(r);
    //       if (typeof cb === "function") {
    //         cb;
    //       }
    //     })
    //     .catch(function (err) {
    //       // 当出错时，此处代码运行
    //       console.warn(err);
    //     });
    // }
    // async RemoveItem(key, cb) {
    //   return await idb
    //     ?.removeItem(key)
    //     .then(() => {
    //       // 当值被移除后，此处代码运行
    //       console.log("Key is cleared!");
    //       if (typeof cb === "function") {
    //         cb;
    //       }
    //     })
    //     .catch(function (err) {
    //       // 当出错时，此处代码运行
    //       console.warn(err);
    //     });
    // }
    async checkAndSetBindIDB(obj) {
        if (obj.id) {
            try {
                const db = await index$2.openDB(this._DB, this._DB_version, {
                    upgrade(db) {
                        // 创建一个名为'items'的存储对象
                        db.createObjectStore('items');
                    },
                });
                // 使用事务从'items'存储中获取给定id的值
                const tx = db.transaction('items', 'readonly');
                const store = tx.objectStore('items');
                const value = await store.get(obj.id);
                // 检查值是否为空字符串
                if (!index$2.isInvalidStringStrict(value)) {
                    obj.bindIDB = "true";
                }
                else {
                    obj.bindIDB = "false";
                }
                console.log(`${obj.id} inited successfully with value \`${value}\``);
            }
            catch (err) {
                // 当出错时，此处代码运行
                console.warn(err);
            }
        }
        else {
            console.error("Object ID is not provided.");
        }
    }
    async initDOMWithIDBValue(id) {
        if (id) {
            try {
                const db = await index$2.openDB(this._DB, this._DB_version, {
                    upgrade(db) {
                        // 创建一个名为'items'的存储对象
                        db.createObjectStore('items');
                    },
                });
                // 使用事务从'items'存储中获取给定id的值
                const tx = db.transaction('items', 'readonly');
                const store = tx.objectStore('items');
                const value = await store.get(id);
                // 获取DOM元素
                const dom = document.getElementById(id);
                if (!index$2.isInvalidStringStrict(value)) {
                    dom.bindIDB = value;
                }
                else {
                    // 根据DOM元素类型设置默认值
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
                console.log(`${id} inited successfully with value \`${value}\``);
            }
            catch (err) {
                // 当出错时，此处代码运行
                console.warn(err);
            }
        }
        else {
            console.error("ID is not provided.");
        }
    }
    async initAllPropFromIDBAsync(dom) {
        // 遍历所有子元素，判断 prop ，取代 propInit 和 checkedInit，绑定但是不回调（与change函数冲突）
        // 目前的问题是加载时没有等待getItem从IDB获取到值而是先setItem覆盖了IDB的值，解决方案：proxy(回调) -> bind -> init
        // 专门为CP这种包含大量配置DOM设计的，propInit 和 checkedInit 整合为 initPropAndBindFromIDBAsync 单点初始化并绑定
        // Object.defineProperty 拦截的是对象的属性，会改变原对象。proxy 是拦截整个对象，通过 new 生成一个新对象，不会改变原对象。
        // Proxy是对整个对象的代理，而Object.defineProperty只能代理某个属性。
        // 对象上新增属性，Proxy可以监听到，Object.defineProperty不能。
        // 若对象内部属性要全部递归代理，Proxy可以只在调用的时候递归，而Object.definePropery需要一次完成所有递归，性能比Proxy差。
        // https://es6.ruanyifeng.com/#docs/proxy
        const _bind = async (id) => {
            const DOM = document.getElementById(id); // 获取dom
            DOM.type === "checkbox";
            console.log(`${id} binded successfully`);
        };
        const _checkedInit = async (obj) => {
            if (index$2.isInvalidStringStrict(obj.id)) {
                console.warn(obj);
                return;
            }
            await _bind(obj.id);
            return this.checkAndSetBindIDB(obj.id);
            // return idb.getItem(obj.id).then(async (v) => {
            //   if (!isInvalidStringStrict(v)) {
            //     obj.bindIDB = "true";
            //   } else {
            //     obj.bindIDB = "false";
            //   }
            //   console.log(`${obj.id} inited successfully with value \`${v}\``);
            // });
        };
        const _propInit = async (id) => {
            if (index$2.isInvalidStringStrict(id)) {
                console.warn(id);
                return;
            }
            await _bind(id);
            return this.initDOMWithIDBValue(id);
            // return idb.getItem(id).then(async (v) => {
            //   const dom = document.getElementById(id) as any;
            //   if (!isInvalidStringStrict(v)) {
            //     dom.bindIDB = v;
            //   } else {
            //     switch (dom.type) {
            //       case "select-one":
            //       case "select-multiple":
            //         dom.bindIDB = dom.options[0].value;
            //         break;
            //       case "number":
            //       case "range":
            //         dom.bindIDB = 0;
            //         break;
            //       default:
            //         dom.bindIDB = "";
            //         break;
            //     }
            //   }
            //   console.log(`${id} inited successfully with value \`${v}\``);
            // });
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
        const selectList = dom.querySelectorAll("select:not([id^='NoSync'])");
        const normalInputList = dom.querySelectorAll("input[id^='SC_winsay_cp']:not([type='checkbox'])");
        const checkboxList = dom.querySelectorAll("input[type='checkbox']:not([id^='NoSync'])");
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
}

const getNewValueFromDomByID = async (id) => {
    const obj = document.getElementById(id);
    if (obj.type === "checkbox" || obj.type === "radio") {
        return obj.checked;
    }
    else {
        return obj.value;
    }
};
async function propChange(id, changeFn) {
    const dom = document.getElementById(id);
    // await changeFn(dom.bindIDB);
    dom.addEventListener("change", async (e) => {
        if (typeof changeFn === "function") {
            // tips: e.target == dom
            await changeFn(e.target.value);
        }
    });
    window.winsay.cp.listened += 1;
    console.log(`${id} listen successfully`);
}
// 后续统一为传入 id
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
const SofillDate = {
    isDuringDate: function (beginDateStr, endDateStr) {
        const curDate = new Date();
        const beginDate = new Date(beginDateStr);
        const endDate = new Date(endDateStr);
        if (curDate >= beginDate && curDate <= endDate) {
            return true;
        }
        return false;
    },
    isDuringTime: function (beginTimeStr, endTimeStr) {
        const curDate = new Date();
        const beginDate = new Date(`${curDate.getFullYear()}-${curDate.getMonth() + 1}-${curDate.getDate()} ${beginTimeStr}`);
        const endDate = new Date(`${curDate.getFullYear()}-${curDate.getMonth() + 1}-${curDate.getDate()} ${endTimeStr}`);
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
    return index$3.parseResponse(index$3.post2Siyuan(url, sqldata));
}

var Attr = {
    getBlockAttrs,
    setBlockAttrs,
    queryBlockById,
};
async function getBlockAttrs(id) {
    let data = {
        id: id,
    };
    let url = "/api/attr/getBlockAttrs";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
}
async function queryBlockById(id) {
    let sql = `select * from blocks where id ='${id}'`;
    let data = await querySQL(sql);
    return data[0];
}
async function setBlockAttrs(id, attrs) {
    let url = "/api/attr/setBlockAttrs";
    return index$3.parseResponse(index$3.post2Siyuan(url, {
        id: id,
        attrs: attrs,
    }));
}

var Av = {};

var Bazaar = {
    getBazaarTheme,
    getInstalledTheme,
};
async function getBazaarTheme(ip, data) {
    let url = "http://" + ip + "/api/bazaar/getBazaarTheme";
    return index$3.post2Siyuan(url, data);
}
async function getInstalledTheme(ip, data) {
    let url = "http://" + ip + "/api/bazaar/getInstalledTheme";
    return index$3.post2Siyuan(url, data);
}

var Block = {
    getBlockKramdown,
    getBlockBreadcrumb,
    insertBlock,
    prependBlock,
    appendBlock,
    deleteBlock,
    updateBlock,
};
/**
 * 获取块kramdown源码
 * @date 2023-03-26
 * @param { string } id
 */
async function getBlockKramdown(id) {
    const data = {
        id: id,
    };
    const url = "/api/block/getBlockKramdown";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
}
/**
 * 获取块面包屑
 * @date 2023-03-26
 * @param { string } id
 */
async function getBlockBreadcrumb(id) {
    const data = {
        id: id,
    };
    const url = "/api/block/getBlockBreadcrumb";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
}
/**
 * desc
 * @date 2023-03-26
 * @param { * } previousID
 * @param { * } dataType
 * @param { * } data
 */
async function insertBlock(previousID, dataType, data) {
    let url = "/api/block/insertBlock";
    return index$3.parseResponse(index$3.post2Siyuan((url = url), (data = {
        previousID: previousID,
        dataType: dataType,
        data: data,
    })));
}
/**
 * 插入前置子块
 * @date 2023-03-26
 * @param { * } parentID
 * @param { * } dataType
 * @param { * } data
 */
async function prependBlock(parentID, dataType, data) {
    let url = "/api/block/prependBlock";
    return index$3.parseResponse(index$3.post2Siyuan((url = url), (data = {
        parentID: parentID,
        dataType: dataType,
        data: data,
    })));
}
/**
 * 插入后置子块
 * @date 2023-03-26
 * @param { * } parentID
 * @param { * } dataType
 * @param { * } data
 */
async function appendBlock(parentID, dataType, data) {
    let url = "/api/block/appendBlock";
    return index$3.parseResponse(index$3.post2Siyuan((url = url), (data = {
        parentID: parentID,
        dataType: dataType,
        data: data,
    })));
}
/**
 * 更新块
 * @date 2023-03-26
 * @param { * } id
 * @param { * } dataType
 * @param { * } data
 */
async function updateBlock(id, dataType, data) {
    let url = "/api/block/updateBlock";
    return index$3.parseResponse(index$3.post2Siyuan((url = url), (data = {
        id: id,
        dataType: dataType,
        data: data,
    })));
}
/**
 * 删除块
 * @date 2023-03-26
 * @param { * } id
 */
async function deleteBlock(id) {
    let url = "/api/block/deleteBlock";
    return index$3.parseResponse(index$3.post2Siyuan(url, {
        id: id,
    }));
}

var Bookmark = {};

var Export = {
    exportMdContent,
};
/**
 * 以id获取文档块markdown
 * @date 2023-03-26
 * @param { string } id
 */
async function exportMdContent(id) {
    let data = {
        id: id,
    };
    let url = "/api/export/exportMdContent";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
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
    createDocWithMd,
    removeDoc,
    renameDoc,
    moveDoc,
    getHPathByPath,
    getHPathByID,
    listDocsByPath,
    getDoc,
    searchDocs,
};
/**
 * 列出指定路径下文档
 * @date 2023-03-26
 * @param { * } path
 */
async function listDocsByPath(path) {
    let data = {
        path: path,
    };
    let url = "/api/filetree/listDocsByPath";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
    //文档hepath与Markdown 内容
}
/**
 * 以id获取文档内容
 * @date 2023-03-26
 * @param { * } id
 */
async function getDoc(id) {
    let data = {
        id: id,
        k: "",
        mode: 2,
        size: 36,
    };
    let url = "/api/filetree/getDoc";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
}
/**
 * 以关键词搜索文档
 * @date 2023-03-26
 * @param { * } k 关键词
 */
async function searchDocs(k) {
    let data = {
        k: k,
    };
    let url = "/api/filetree/searchDocs";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
}
/**
 * 重命名思源文档
 * @date 2023-03-26
 * @param { * } notebook 笔记本id
 * @param { * } path 文档路径
 * @param { * } title 文档新标题
 */
async function renameDoc(notebook, path, title) {
    let data = {
        notebook,
        path,
        title,
    };
    let url = "/api/filetree/renameDoc";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
    //返回空数据
}
/**
 * 删除思源文档
 * @date 2023-03-26
 * @param { * } notebook 笔记本id
 * @param { * } path 文档路径
 */
async function removeDoc(notebook, path) {
    let data = {
        notebook,
        path,
    };
    let url = "/api/filetree/removeDoc";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
    //返回空数据
}
/**
 * 移动思源文档
 * @date 2023-03-26
 * @param { * } fromNotebook 源笔记本ID
 * @param { * } fromPath 源路径
 * @param { * } toNotebook 目标笔记本ID
 * @param { * } toPath 目标路径
 */
async function moveDoc(fromNotebook, fromPath, toNotebook, toPath) {
    let data = {
        fromNotebook,
        fromPath,
        toNotebook,
        toPath,
    };
    let url = "/api/filetree/moveDoc";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
    //返回空数据
}
/**
 * 根据思源路径获取人类可读路径
 * @date 2023-03-25
 * @param { * } Notebook 笔记本ID
 * @param { * } Path 路径
 */
async function getHPathByPath(Notebook, Path) {
    let data = {
        Notebook,
        Path,
    };
    let url = "/api/filetree/getHPathByPath";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
    //返回路径
}
/**
 * 根据块ID查询文档人类可读完整路径
 * @date 2023-03-25
 * @param { * } ID
 */
async function getHPathByID(ID) {
    let data = {
        id: ID,
    };
    let url = "/api/filetree/getHPathByID";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
}
/**
 * 通过markdown创建文档
 * @date 2023-03-26
 * @param { * } notebook
 * @param { * } path
 * @param { * } markdown
 */
async function createDocWithMd(notebook, path, markdown) {
    let data = {
        notebook: notebook,
        path: path,
        markdown: markdown,
    };
    let url = "/api/filetree/createDocWithMd";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
}

var Format = {};

var Graph = {
    getLocalGraph,
    getGraph,
};
/**
 * 以id获取局部图谱
 * @date 2023-03-26
 * @param { * } k
 * @param { * } id
 * @param { * } conf
 * @param { * } reqId
 */
async function getLocalGraph(k, id, conf, reqId) {
    let data = {
        id: id,
        k: k,
        conf: conf,
        reqId: reqId,
    };
    let url = "/api/graph/getLocalGraph";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
}
/**
 * 获取全局图谱
 * @date 2023-03-26
 * @param { * } k
 * @param { * } conf
 * @param { * } reqId
 */
async function getGraph(k, conf, reqId) {
    let data = {
        k: k,
        conf: conf,
        reqId: reqId,
    };
    let url = "/api/graph/getGraph";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
}

var History = {};

var Import = {};

var Inbox = {};

var Lute = {};

var Notebook = {
    createNotebook,
    removeNotebook,
    setNotebookConf,
    getNotebookConf,
    openNotebook,
    closeNotebook,
    renameNotebook,
};
/**
 * 删除思源笔记本
 * @date 2023-03-26
 * @param { * } notebook 笔记本id
 */
async function removeNotebook(notebook) {
    let data = { notebook: notebook };
    let url = "/api/notebook/removeNotebook";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
    //返回空数据
}
/**
 * 获取思源笔记本配置
 * @date 2023-03-26
 * @param { * } notebook 笔记本id
 */
async function getNotebookConf(notebook) {
    let data = { notebook: notebook };
    let url = "/api/notebook/getNotebookConf";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
    //返回笔记本配置
}
/**
 * 保存思源笔记本配置
 * @date 2023-03-26
 * @param { * } notebook 笔记本id
 */
async function setNotebookConf(notebook) {
    let data = { notebook: notebook };
    let url = "/api/notebook/setNotebookConf";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
    //返回笔记本配置
}
/**
 * 打开思源笔记本
 * @date 2023-03-26
 * @param { string } id
 */
async function openNotebook(id) {
    let data = {
        notebook: id,
    };
    let url = "/api/notebook/openNotebook";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
    //返回空数据
}
/**
 * 关闭思源笔记本
 * @date 2023-03-26
 * @param { string } id
 */
async function closeNotebook(id) {
    let data = {
        notebook: id,
    };
    let url = "/api/notebook/closeNotebook";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
    //返回空数据
}
/**
 * 重命名思源笔记本
 * @date 2023-03-26
 * @param { * } notebook 笔记本id
 * @param { * } name 笔记本的新名称
 */
async function renameNotebook(notebook, name) {
    let data = {
        notebook,
        name,
    };
    let url = "/api/notebook/renameNotebook";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
    //返回空数据
}
/**
 * 新建思源笔记本
 * @date 2023-03-26
 * @param { * } name
 */
async function createNotebook(name) {
    let data = {
        name: name,
    };
    let url = "/api/notebook/createNotebook";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
    //返回空数据
}

/**
 * @deprecated 过时的
 */
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
function pushMsg(msg, timeout = 7000) {
    let data = {
        msg: msg,
        timeout: timeout,
    };
    let url = "/api/notification/pushMsg";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
}

var Outline = {
    getDocOutline,
};
/**
 * 以id获取文档大纲
 * @date 2023-03-26
 * @param { string } id
 */
async function getDocOutline(id) {
    let data = {
        id: id,
    };
    let url = "/api/outline/getDocOutline";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
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
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
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
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
}
async function queryBlock(query) {
    let data = {
        query: query,
    };
    let url = "/api/search/searchBlock";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
}
async function queryTemplate(k) {
    let data = {
        k: k,
    };
    let url = "/api/search/searchTemplate";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
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
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
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
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
}
async function renderTemplate(data) {
    let url = "/api/template/render";
    return index$3.parseResponse(index$3.post2Siyuan(url, data));
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

exports.CopyDOM = index$1.CopyDOM;
exports.MoveChildren = index$1.MoveChildren;
exports.MoveDOM = index$1.MoveDOM;
exports.addinsertCreateElement = index$1.addinsertCreateElement;
exports.bodyAC = index$1.bodyAC;
exports.bodyCC = index$1.bodyCC;
exports.bodyRC = index$1.bodyRC;
exports.diguiTooONE = index$1.diguiTooONE;
exports.eRemoveProperty = index$1.eRemoveProperty;
exports.eSetProperty = index$1.eSetProperty;
exports.getActualWidthOfChars = index$1.getActualWidthOfChars;
exports.insertCreateAfter = index$1.insertCreateAfter;
exports.AddEvent = index$2.AddEvent;
exports.RangeLimitedInt = index$2.RangeLimitedInt;
exports.addURLParam = index$2.addURLParam;
exports.compareVersion = index$2.compareVersion;
exports.getThemeMode = index$2.getThemeMode;
exports.isInvalidStringStrict = index$2.isInvalidStringStrict;
exports.isPromise = index$2.isPromise;
exports.loadScript = index$2.loadScript;
exports.loadStyle = index$2.loadStyle;
exports.myRemoveEvent = index$2.myRemoveEvent;
exports.removejscssfile = index$2.removejscssfile;
exports.sleep = index$2.sleep;
exports.updateStyle = index$2.updateStyle;
exports.genUUID = index$3.genUUID;
exports.isMobile = index$3.isMobile;
exports.isWindow = index$3.isWindow;
exports.parseResponse = index$3.parseResponse;
exports.post2Siyuan = index$3.post2Siyuan;
exports.AI = AI;
exports.Account = Account;
exports.Asset = Asset;
exports.Attr = Attr;
exports.Av = Av;
exports.Bazaar = Bazaar;
exports.Block = Block;
exports.Bookmark = Bookmark;
exports.Export = Export;
exports.File = index;
exports.Filetree = Filetree;
exports.Format = Format;
exports.Graph = Graph;
exports.History = History;
exports.Import = Import;
exports.Inbox = Inbox;
exports.LimitPromise = LimitPromise;
exports.LocalStorage = LocalStorage;
exports.Lute = Lute;
exports.Notebook = Notebook;
exports.Outline = Outline;
exports.Query = Query;
exports.Ref = Ref;
exports.Repo = Repo;
exports.Riff = Riff;
exports.Search = Search;
exports.Setting = Setting;
exports.Snippet = Snippet;
exports.SofillDate = SofillDate;
exports.Storage = Storage;
exports.Sync = Sync;
exports.System = System;
exports.Tag = Tag;
exports.Template = Template;
exports.checkedChange = checkedChange;
exports.getBazaarTheme = getBazaarTheme;
exports.getFocusedBlock = getFocusedBlock;
exports.getFocusedBlockID = getFocusedBlockID;
exports.getFocusedDoc = getFocusedDoc;
exports.getFocusedDocBackground = getFocusedDocBackground;
exports.getFocusedDocID = getFocusedDocID;
exports.getFocusedID = getFocusedID;
exports.getInstalledTheme = getInstalledTheme;
exports.getNewValueFromDomByID = getNewValueFromDomByID;
exports.getTooltipDirection = getTooltipDirection;
exports.getUrlParam = getUrlParam;
exports.getUrlParams = getUrlParams;
exports.insertCreateBefore = insertCreateBefore;
exports.propChange = propChange;
exports.pushMsg = pushMsg;
exports.querySQL = querySQL;
exports.setTooltipDirection = setTooltipDirection;
exports.通知 = 通知;
