export declare class LimitPromise {
    private _max;
    private _count;
    private _taskQueue;
    constructor(max: any);
    /**
     * 调用器，将异步任务函数和它的参数传入
     * @param caller 异步任务函数，它必须是async函数或者返回Promise的函数
     * @param args 异步任务函数的参数列表
     * @returns {Promise<unknown>} 返回一个新的Promise
     */
    call(caller: any, ...args: any[]): Promise<unknown>;
    /**
     * 创建一个任务
     * @param caller 实际执行的函数
     * @param args 执行函数的参数
     * @param resolve
     * @param reject
     * @returns {Function} 返回一个任务函数
     * @private
     */
    _createTask(caller: any, args: any, resolve: any, reject: any): () => void;
}
export declare class LocalStorage {
    private _DB;
    private _DB_version;
    private _MAX;
    limitP: LimitPromise;
    constructor(max: any, DB?: string, DB_version?: number);
    getItem(key: any, cb?: any): Promise<unknown>;
    setItem(key: any, value: any, cb?: any): Promise<unknown>;
    removeItem(key: any, cb?: any): Promise<unknown>;
    GetItem(key: string): Promise<any>;
    SetItem(key: string, value: any, cb?: () => void): Promise<void>;
    RemoveItem(key: string, cb?: () => void): Promise<void>;
    checkAndSetBindIDB(obj: {
        id: any;
        bindIDB?: string;
    }): Promise<void>;
    initDOMWithIDBValue(id: string): Promise<void>;
    initAllPropFromIDBAsync(dom: any): Promise<void>;
}
