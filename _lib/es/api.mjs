/*!
* sofill v1.0.71
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
export { C as CopyDOM, b as MoveChildren, M as MoveDOM, a as addinsertCreateElement, c as bodyAC, f as bodyCC, e as bodyRC, d as diguiTooONE, j as eRemoveProperty, h as eSetProperty, g as getActualWidthOfChars, i as insertCreateAfter } from '../../index-8a56c84a.js';
import { l as localforageExports } from '../../localforage-2137594f.js';
import { i as isEmptyString } from '../../index-1cd240a4.js';
export { A as AddEvent, R as RangeLimitedInt, e as addURLParam, c as compareVersion, g as getThemeMode, b as isEmpty, a as isPromise, d as loadScript, l as loadStyle, m as myRemoveEvent, r as removejscssfile, s as sleep, u as updateStyle } from '../../index-1cd240a4.js';
import { p as parseResponse, a as post2Siyuan } from '../../index-c5460c2d.js';
export { g as genUUID, i as isMobile, b as isWindow } from '../../index-c5460c2d.js';

// 绑定DOM元素中的全部控件
const bindAllControls = (domElem) => {
    return new Proxy(domElem, {
        set(target, key, value) {
            // 当控件发生变化时，使用localforage库存储新值到indexedDB
            localforageExports.setItem(key.toString(), value);
            return true;
        },
    });
};
// 在上述代码中，使用了localforage库来操作indexedDB，使用Proxy对象来代理DOM元素中的全部控件，在set方法中实现了当控件发生变化时存储新值到indexedDB的逻辑。最后，示例使用了bindAllControls函数来绑定DOM元素中的全部控件。
// 如果需要在控件变化时执行其他的逻辑，可以在set方法中添加相应的代码。例如，以下代码在控件变化时，除了存储新值到indexedDB外，还将新值显示在页面上：
// 绑定DOM元素中的全部控件
const bindAllControls2 = (domElem) => {
    return new Proxy(domElem, {
        set(target, key, value) {
            // 当控件发生变化时，使用localforage库存储新值到indexedDB
            localforageExports.setItem(key.toString(), value);
            // 将新值显示在页面上
            const controlElem = target.querySelector(`[id="${String(key)}"]`);
            controlElem.textContent = value;
            return true;
        },
    });
};
// 在上述代码中，添加了将新值显示在页面上的逻辑：在set方法中，通过querySelector方法找到对应的控件元素，将其textContent修改为新值。需要注意的是，这里假设控件的name属性和key值是一致的，如果不是，需要做相应的调整。
// 如果需要在页面加载时，将indexedDB中保存的值恢复到页面上，可以使用以下代码：
// 绑定DOM元素中的全部控件
const bindAllControls3 = async (domElem) => {
    // 页面加载时，将indexedDB中保存的值恢复到页面上
    const keys = await localforageExports.keys();
    for (const key of keys) {
        await localforageExports.getItem(key);
        const controlElem = domElem.querySelector(`[id="${key}"]`);
        controlElem.textContent = String(key);
    }
    const proxyObj = new Proxy(domElem, {
        set(target, key, value) {
            // 当控件发生变化时，使用localforage库存储新值到indexedDB
            localforageExports.setItem(key.toString(), value);
            // 将新值显示在页面上
            const controlElem = target.querySelector(`[id="${String(key)}"]`);
            controlElem.textContent = value;
            return true;
        },
    });
    return proxyObj;
};
// 在上述代码中，添加了在页面加载时将indexedDB中保存的值恢复到页面上的逻辑：在bindAllControls方法中，通过await和localforage的API获取indexedDB中保存的所有key，然后根据每个key的值来更新页面中对应的控件内容。最后，返回Proxy对象以便后续使用。需要注意的是，这里使用了async/await语法，需要确保代码运行在支持该语法的环境中。
// 如果需要在控件变化时执行多个逻辑，可以将这些逻辑封装成函数，然后在set方法中调用这些函数。例如，以下代码在控件变化时，除了存储新值到indexedDB外，还将新值显示在页面上，并发送Ajax请求保存新值到服务器：
const updateControlValue = (key, value, target) => {
    const controlElem = target.querySelector(`[id="${key}"]`);
    controlElem.textContent = value;
};
// 如果需要支持控件的多种事件（如change、input等），可以使用以下代码：
// 绑定DOM元素中的全部控件
const bindAllControls5 = (domElem, events) => {
    const proxyObj = new Proxy(domElem, {
        set(target, key, value) {
            // 当控件发生变化时，使用localforage库存储新值到indexedDB
            localforageExports.setItem(key.toString(), value).then(() => {
                updateControlValue(key.toString(), value, target);
            });
            return true;
        },
    });
    // 绑定事件
    for (const event of events) {
        domElem.addEventListener(event, (e) => {
            const target = e.target;
            const key = target.getAttribute("name");
            const value = target.getAttribute("value");
            if (key && value) {
                proxyObj[key] = value;
            }
        });
    }
    return proxyObj;
};
// 在上述代码中，添加了一个events参数，用于指定要绑定的事件类型。在bindAllControls方法中，遍历events数组，为DOM元素绑定指定的事件类型。在事件处理程序中，获取事件目标元素的name和value属性，然后使用Proxy对象更新数据。需要注意的是，这里假设控件的value属性存储的是字符串类型的值，如果需要支持其他数据类型，需要根据实际情况做出相应的调整。
// 如果需要支持控件的多种事件以及自定义事件处理逻辑，可以使用以下代码：
// 绑定DOM元素中的全部控件
const bindAllControls6 = (domElem, handlers) => {
    const proxyObj = new Proxy(domElem, {
        set(target, key, value) {
            // 当控件发生变化时，使用localforage库存储新值到indexedDB
            localforageExports.setItem(key.toString(), value).then(() => {
                // 将新值显示在页面上
                updateControlValue(key.toString(), value, target);
            });
            return true;
        },
    });
    // 绑定事件
    for (const event in handlers) {
        if (handlers.hasOwnProperty(event)) {
            domElem.addEventListener(event, (e) => {
                const target = e.target;
                const key = target.getAttribute("name");
                const value = target.getAttribute("value");
                if (key && value) {
                    handlers[event](key, value);
                    proxyObj[key] = value;
                }
            });
        }
    }
    return proxyObj;
};
// 在上述代码中，添加了一个handlers参数，用于指定要绑定的事件类型以及对应的事件处理程序。在bindAllControls方法中，遍历handlers对象，为DOM元素绑定指定的事件类型，并在事件处理程序中调用对应的事件处理程序。需要注意的是，这里假设控件的value属性存储的是字符串类型的值，如果需要支持其他数据类型，需要根据实际情况做出相应的调整。
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
    _MAX;
    limitP;
    constructor(max) {
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
    async GetItem(key) {
        if (key) {
            return await localforageExports.getItem(key).catch(function (err) {
                // 当出错时，此处代码运行
                console.warn(err);
            });
        }
        else {
            console.error("Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'getItem')");
            return;
        }
    }
    async SetItem(key, value, cb) {
        return await localforageExports.setItem(key, value)
            .then(function (r) {
            // 当值被存储后，可执行其他操作
            console.log(r);
        })
            .catch(function (err) {
            // 当出错时，此处代码运行
            console.warn(err);
        });
    }
    async RemoveItem(key, cb) {
        return await localforageExports.removeItem(key)
            .then(() => {
            // 当值被移除后，此处代码运行
            console.log("Key is cleared!");
        })
            .catch(function (err) {
            // 当出错时，此处代码运行
            console.warn(err);
        });
    }
}
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
        const DOM = document.getElementById(id); // 获取dom
        DOM.type === "checkbox";
        new Proxy(DOM, {
            get(target, prop, receiver) {
                if (prop === "bindIDB") {
                    if (target.type === "checkbox") {
                        return target.checked;
                    }
                    else {
                        return target.value;
                    }
                }
                else {
                    return Reflect.get(target, prop, receiver);
                }
            },
            set(target, prop, value, receiver) {
                if (prop === "bindIDB") {
                    if (target.type === "checkbox") {
                        target.checked = value === "true" ? true : false;
                    }
                    else {
                        target.value = value;
                    }
                    localforageExports.setItem(target.id, value);
                    return true;
                }
                else {
                    return Reflect.set(target, prop, value, receiver);
                }
            },
        });
        // Object.defineProperty(DOM, prop, {
        //   get: () => {
        //     if (isCheckbox) {
        //       return DOM.checked;
        //     } else {
        //       return DOM.value;
        //     }
        //   },
        //   set: function (value) {
        //     if (isCheckbox) {
        //       DOM.checked = value === "true" ? true : false;
        //     } else {
        //       DOM.value = value;
        //     }
        //     idb.setItem(id, value);
        //     return true;
        //   },
        //   configurable: true,
        // });
        // function watchOut(obj, opts) {
        //   const handler = {
        //     get(target, property) {
        //       opts.beforeRead(target, property);
        //       const result = Reflect.get(target, property);
        //       opts.read(target, property);
        //       return result;
        //     },
        //     set(target, property, value) {
        //       opts.beforeUpdated(value, property, value);
        //       if (target[property] !== value)
        //         opts.beforeChanged(value, property, value);
        //       const result = Reflect.set(target, property, value);
        //       opts.updated(value, property, value);
        //       opts.changed(value, property, value);
        //       if (typeof value === "object") {
        //         target[property] = toDeepProxy(target[property], handler); //当value为一个对象时，对此对象也进行深度代理
        //       }
        //       return result;
        //     },
        //   };
        //   return toDeepProxy(obj, handler);
        //   function toDeepProxy(object, handler) {
        //     if (!isPureObject(object)) addSubProxy(object, handler);
        //     return new Proxy(object, handler);
        //     function addSubProxy(object, handler) {
        //       for (const prop in object) {
        //         if (typeof object[prop] === "object") {
        //           if (!isPureObject(object[prop]))
        //             addSubProxy(object[prop], handler);
        //           object[prop] = new Proxy(object[prop], handler);
        //         }
        //       }
        //       object = new Proxy(object, handler);
        //     }
        //     function isPureObject(object) {
        //       if (typeof object !== "object") {
        //         return false;
        //       } else {
        //         for (const prop in object) {
        //           if (typeof object[prop] === "object") {
        //             return false;
        //           }
        //         }
        //       }
        //       return true;
        //     }
        //   }
        // }
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
            const dom = document.getElementById(id);
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

const getNewValueFromDomByID = async (id) => {
    let obj = document.getElementById(id);
    if (obj.type === "checkbox" || obj.type === "radio") {
        return obj.checked;
    }
    else {
        return obj.value;
    }
};
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
    return parseResponse(post2Siyuan(url, sqldata));
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
    return parseResponse(post2Siyuan(url, data));
}
async function queryBlockById(id) {
    let sql = `select * from blocks where id ='${id}'`;
    let data = await querySQL(sql);
    return data[0];
}
async function setBlockAttrs(id, attrs) {
    let url = "/api/attr/setBlockAttrs";
    return parseResponse(post2Siyuan(url, {
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
    return post2Siyuan(url, data);
}
async function getInstalledTheme(ip, data) {
    let url = "http://" + ip + "/api/bazaar/getInstalledTheme";
    return post2Siyuan(url, data);
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan((url = url), (data = {
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
    return parseResponse(post2Siyuan((url = url), (data = {
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
    return parseResponse(post2Siyuan((url = url), (data = {
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
    return parseResponse(post2Siyuan((url = url), (data = {
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
    return parseResponse(post2Siyuan(url, {
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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
    return parseResponse(post2Siyuan(url, data));
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

export { AI, Account, Asset, Attr, Av, Bazaar, Block, Bookmark, Export, index as File, Filetree, Format, Graph, History, Import, Inbox, LimitPromise, LocalStorage, Lute, Notebook, Outline, Query, Ref, Repo, Riff, Search, Setting, Snippet, SofillDate, Storage, Sync, System, Tag, Template, bindAllControls, bindAllControls2, bindAllControls3, bindAllControls5, bindAllControls6, checkedChange, getBazaarTheme, getFocusedBlock, getFocusedBlockID, getFocusedDoc, getFocusedDocBackground, getFocusedDocID, getFocusedID, getInstalledTheme, getNewValueFromDomByID, getTooltipDirection, getUrlParam, getUrlParams, initAllPropFromIDBAsync, insertCreateBefore, isEmptyString, parseResponse, post2Siyuan, propChange, pushMsg, querySQL, setTooltipDirection, 通知 };
