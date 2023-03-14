/*!
* sofill v1.0.53
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
'use strict';

var path = require('path');
var sleep = require('../../sleep-60d58d02.js');
var localforage = require('../../localforage-df6835ec.js');

function importFromJson(idbDatabase, importObject) {
    return new Promise((resolve, reject) => {
        const snList = Object.values(idbDatabase.result.objectStoreNames);
        snList.forEach((storeName) => {
            if (importObject[storeName].length > 0) {
                const transaction = idbDatabase.result.transaction(storeName, "readwrite");
                // transaction.addEventListener('error', reject)
                transaction.onerror = function (event) {
                    window.sout.error("transaction error: " + transaction.error);
                    reject();
                };
                let count = 0;
                importObject[storeName].forEach((toAdd) => {
                    let value = Object.values(toAdd)[0];
                    const key = Object.keys(toAdd)[0];
                    if (!value || Object.keys(value).length === 0) {
                        value = "";
                    }
                    const request = transaction.objectStore(storeName);
                    const req = request.openCursor(key);
                    req.onsuccess = function (e) {
                        const cursor = e.target.result;
                        if (cursor) ;
                        else { // key not exist
                            request.add(value, key);
                        }
                        count++;
                        if (count === importObject[storeName].length) {
                            // Added all objects for this store
                            delete importObject[storeName];
                            if (Object.keys(importObject).length === 0) {
                                // Added all object stores
                                resolve();
                            }
                        }
                    };
                });
            }
            else {
                delete importObject[storeName];
            }
        });
    });
}

async function exportToJson(idbDatabase) {
    return new Promise((resolve, reject) => {
        const exportObject = {};
        if (idbDatabase.result.objectStoreNames.length === 0) {
            resolve(JSON.stringify(exportObject));
        }
        else {
            const snList = Object.values(idbDatabase.result.objectStoreNames);
            snList.forEach((storeName) => {
                const allObjects = [];
                const transaction = idbDatabase.result.transaction(storeName, "readonly");
                transaction.addEventListener("error", reject);
                transaction
                    .objectStore(storeName)
                    .openCursor()
                    .addEventListener("success", (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        // Cursor holds value, put it into store data
                        const dic = {};
                        dic[cursor.key] = cursor.value;
                        allObjects.push(dic);
                        cursor.continue();
                    }
                    else {
                        // No more values, store is done
                        exportObject[storeName] = allObjects;
                        // Last store was handled
                        if (idbDatabase.result.objectStoreNames.length ===
                            Object.keys(exportObject).length) {
                            resolve(JSON.stringify(exportObject));
                        }
                    }
                });
            });
        }
    });
}

async function importIDB(result) {
    if (window.Sillot.status.IDBloaded &&
        !window.location.search.startsWith("?b=Sillot")) {
        return;
    }
    const importObject = result.data;
    const dbList = Object.keys(importObject);
    let resolved = 0;
    let waittime = 0.0;
    return new Promise(async (resolve, reject) => {
        dbList.forEach((dbName) => {
            if (Object.keys(importObject[dbName]).length === 0) {
                resolved += 1;
            }
            else {
                const DBOpenRequest = window.indexedDB.open(dbName);
                DBOpenRequest.onupgradeneeded = function (event) {
                    // 数据库创建或升级时触发
                    const db = DBOpenRequest.result;
                    const kList = Object.keys(importObject[dbName]);
                    kList.forEach((key) => {
                        if (!db.objectStoreNames.contains(key)) {
                            db.createObjectStore(key);
                            window.sout.warn(key);
                        }
                    });
                };
                DBOpenRequest.onsuccess = function (event) {
                    // 第一次打开数据库时，会先触发upgradeneeded事件，然后触发success事件
                    importFromJson(DBOpenRequest, importObject[dbName])
                        .then(() => {
                        resolved += 1;
                    })
                        .catch((e) => {
                        window.sout.error(e);
                        resolved += 1;
                    });
                };
                // 失败时触发
                DBOpenRequest.onerror = (event) => {
                    window.sout.error(event);
                    reject(event);
                };
            }
        });
        while (true) {
            if (resolved === dbList.length || waittime > 10.0) {
                break;
            }
            else {
                await sleep.sleep(100);
                waittime += 0.1;
            }
        }
        resolve(resolved);
    });
}
async function exportIDB() {
    if (window.location.search.startsWith("?b=Sillot")) {
        return;
    }
    const dbList = (await window.indexedDB.databases()).map((db) => db.name);
    return new Promise(async (resolve, reject) => {
        resolve(dbList);
    }).then(async (resolve) => {
        const exData = {};
        resolve.forEach((dbName) => {
            const DBOpenRequest = window.indexedDB.open(dbName);
            DBOpenRequest.onsuccess = (e) => {
                exportToJson(DBOpenRequest).then((response) => {
                    exData[dbName] = JSON.parse(response);
                });
            };
            // 失败时触发
            DBOpenRequest.onerror = (event) => {
                window.sout.error(event);
            };
        });
        while (true) {
            if (Object.keys(exData).length === dbList.length) {
                break;
            }
            else {
                await sleep.sleep(100);
            }
        }
        const workspaceName = path.basename(window.siyuan?.config.system.workspaceDir);
        const formdata = new FormData();
        formdata.append("f", `IDB__${workspaceName}__.json`);
        formdata.append("data", JSON.stringify(exData));
        const url = "http://127.0.0.1:58131/api/sillot/setConfigesStore";
        fetch(url, {
            body: formdata,
            method: "POST",
        }).then(function (response) { });
    });
}

async function setItem(key, value, cb) {
    try {
        const v = await localforage.localforageExports.setItem(key, value);
        cb ? cb() : console.log(v);
        v(true);
    }
    catch (e) {
        console.error(e);
        e(false);
    }
}
function getItem(key, cb) {
    return localforage.localforageExports.getItem(key)
        .then((v) => {
        cb ? cb() : console.log(v);
    })
        .catch((e) => {
        console.error(e);
    });
}

exports.exportIDB = exportIDB;
exports.getItem = getItem;
exports.importIDB = importIDB;
exports.setItem = setItem;
