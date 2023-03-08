export declare function compareVersion(version1: any, version2: any): 0 | 1 | -1;
export declare const getThemeMode: string;
export declare const isPromise: (val: any) => boolean;
export declare function isEmpty(obj: any): boolean;
export declare function isEmptyString(obj: any): boolean;
export declare function RangeLimitedInt(min: any, value1: any, max: any): number;
export declare function removejscssfile(filename: any, filetype: any): void;
/**
 * 为元素注册监听事件
 * @param {Element} element
 * @param {string} strType
 * @param {Fun} fun
 */
export declare function AddEvent(element: any, strType: any, fun: any): void;
/**
 * 为元素解绑监听事件
 * @param {Element}  element ---注册事件元素对象
 * @param {String}   strType ---注册事件名(不加on 如"click")
 * @param {Function} fun	 ---回调函数
 *
 */
export declare function myRemoveEvent(element: any, strType: any, fun: any): void;
export declare function loadStyle(href: any, id?: any): void;
export declare function updateStyle(id: any, href: any): void;
export declare function loadScript(src: any, type?: string, async?: boolean, defer?: boolean): HTMLScriptElement;
export declare function addURLParam(url: any, param?: {
    v: string;
}): any;
