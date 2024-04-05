/*!
* sofill v1.1.8
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
* https://jsr.io/@sisi/sofill
*/
const instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);
let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey]);
}
const transactionDoneMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener('success', success);
      request.removeEventListener('error', error);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener('success', success);
    request.addEventListener('error', error);
  });
  // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
  // is because we create many promises from a single IDBRequest.
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  // Early bail if we've already created a done promise for this transaction.
  if (transactionDoneMap.has(tx)) return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener('complete', complete);
      tx.removeEventListener('error', error);
      tx.removeEventListener('abort', error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException('AbortError', 'AbortError'));
      unlisten();
    };
    tx.addEventListener('complete', complete);
    tx.addEventListener('error', error);
    tx.addEventListener('abort', error);
  });
  // Cache it for later retrieval.
  transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      // Special handling for transaction.done.
      if (prop === 'done') return transactionDoneMap.get(target);
      // Make tx.store return the only store in the transaction, or undefined if there are many.
      if (prop === 'store') {
        return receiver.objectStoreNames[1] ? undefined : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    // Else transform whatever we get back.
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store')) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  // Due to expected object equality (which is enforced by the caching in `wrap`), we
  // only create one new func per func.
  // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
  // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
  // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
  // with real promises, so each advance methods returns a new promise for the cursor object, or
  // undefined if the end of the cursor has been reached.
  if (getCursorAdvanceMethods().includes(func)) {
    return function (...args) {
      // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
      // the original object.
      func.apply(unwrap(this), args);
      return wrap(this.request);
    };
  }
  return function (...args) {
    // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
    // the original object.
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === 'function') return wrapFunction(value);
  // This doesn't return, it just creates a 'done' promise for the transaction,
  // which is later returned for transaction.done (see idbObjectHandler).
  if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
  // Return the same value back if we're not going to transform it.
  return value;
}
function wrap(value) {
  // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
  // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
  if (value instanceof IDBRequest) return promisifyRequest(value);
  // If we've already transformed this value before, reuse the transformed value.
  // This is faster, but it also provides object equality.
  if (transformCache.has(value)) return transformCache.get(value);
  const newValue = transformCachableValue(value);
  // Not all types are transformed.
  // These may be primitive types, so they can't be WeakMap keys.
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
const unwrap = value => reverseTransformCache.get(value);

/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, {
  blocked,
  upgrade,
  blocking,
  terminated
} = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener('upgradeneeded', event => {
      upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
    });
  }
  if (blocked) {
    request.addEventListener('blocked', event => blocked(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    event.oldVersion, event.newVersion, event));
  }
  openPromise.then(db => {
    if (terminated) db.addEventListener('close', () => terminated());
    if (blocking) {
      db.addEventListener('versionchange', event => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {});
  return openPromise;
}
const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === 'string')) {
    return;
  }
  if (cachedMethods.get(prop)) return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, '');
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
  // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
  !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
    return;
  }
  const method = async function (storeName, ...args) {
    // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
    const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
    let target = tx.store;
    if (useIndex) target = target.index(args.shift());
    // Must reject if op rejects.
    // If it's a write operation, must reject if tx.done rejects.
    // Must reject with op rejection first.
    // Must resolve with op value.
    // Must handle both promises (no unhandled rejections)
    return (await Promise.all([target[targetFuncName](...args), isWrite && tx.done]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
replaceTraps(oldTraps => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
const advanceMethodProps = ['continue', 'continuePrimaryKey', 'advance'];
const methodMap = {};
const advanceResults = new WeakMap();
const ittrProxiedCursorToOriginalProxy = new WeakMap();
const cursorIteratorTraps = {
  get(target, prop) {
    if (!advanceMethodProps.includes(prop)) return target[prop];
    let cachedFunc = methodMap[prop];
    if (!cachedFunc) {
      cachedFunc = methodMap[prop] = function (...args) {
        advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
      };
    }
    return cachedFunc;
  }
};
async function* iterate(...args) {
  // tslint:disable-next-line:no-this-assignment
  let cursor = this;
  if (!(cursor instanceof IDBCursor)) {
    cursor = await cursor.openCursor(...args);
  }
  if (!cursor) return;
  cursor = cursor;
  const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
  ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
  // Map this double-proxy back to the original, so other cursor methods work.
  reverseTransformCache.set(proxiedCursor, unwrap(cursor));
  while (cursor) {
    yield proxiedCursor;
    // If one of the advancing methods was not called, call continue().
    cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
    advanceResults.delete(proxiedCursor);
  }
}
function isIteratorProp(target, prop) {
  return prop === Symbol.asyncIterator && instanceOfAny(target, [IDBIndex, IDBObjectStore, IDBCursor]) || prop === 'iterate' && instanceOfAny(target, [IDBIndex, IDBObjectStore]);
}
replaceTraps(oldTraps => ({
  ...oldTraps,
  get(target, prop, receiver) {
    if (isIteratorProp(target, prop)) return iterate;
    return oldTraps.get(target, prop, receiver);
  },
  has(target, prop) {
    return isIteratorProp(target, prop) || oldTraps.has(target, prop);
  }
}));

// 如果 version1 > version2 返回 1，如果 version1 < version2 返回 -1， 除此之外返回 0。
function compareVersion(version1, version2) {
    const arr1 = version1.split(".");
    const arr2 = version2.split(".");
    const length1 = arr1.length;
    const length2 = arr2.length;
    const minlength = Math.min(length1, length2);
    let i = 0;
    for (i; i < minlength; i++) {
        const a = parseInt(arr1[i]);
        const b = parseInt(arr2[i]);
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
        obj === undefined ||
        obj === "" ||
        obj === "null" ||
        obj === "NULL");
}
function RangeLimitedInt(min, value1, max) {
    const v1 = parseInt(min, 10);
    const v2 = parseInt(value1, 10);
    const v3 = parseInt(max, 10);
    const vmin = v2 < v3 ? v2 : v3;
    const vmax = v1 > vmin ? v1 : vmin;
    return vmax;
}
function removejscssfile(filename, filetype) {
    const targetelement = filetype === "js" ? "script" : filetype === "css" ? "link" : "none";
    const targetattr = filetype === "js" ? "src" : filetype === "css" ? "href" : "none";
    const allsuspects = document.getElementsByTagName(targetelement);
    for (let i = allsuspects.length; i >= 0; i--) {
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
    const style = document.createElement("link");
    if (id)
        style.id = id;
    style.type = "text/css";
    style.rel = "stylesheet";
    style.href = href;
    document.head.appendChild(style);
}
function updateStyle(id, href) {
    const style = document.getElementById(id);
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
    for (const [key, value] of Object.entries(param)) {
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

export { AddEvent as A, RangeLimitedInt as R, isPromise as a, isEmpty as b, compareVersion as c, loadScript as d, addURLParam as e, getThemeMode as g, isEmptyString as i, loadStyle as l, myRemoveEvent as m, openDB as o, removejscssfile as r, sleep as s, updateStyle as u };
