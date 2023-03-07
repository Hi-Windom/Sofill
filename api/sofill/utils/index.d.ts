export { compareVersion, isEmpty, RangeLimitedInt, removejscssfile, AddEvent, myRemoveEvent, };
declare function compareVersion(version1: any, version2: any): 0 | 1 | -1;
declare function isEmpty(obj: any): boolean;
declare function RangeLimitedInt(min: any, value1: any, max: any): number;
declare function removejscssfile(filename: any, filetype: any): void;
/**
 * 为元素注册监听事件
 * @param {Element} element
 * @param {string} strType
 * @param {Fun} fun
 */
declare function AddEvent(element: any, strType: any, fun: any): void;
/**
 * 为元素解绑监听事件
 * @param {Element}  element ---注册事件元素对象
 * @param {String}   strType ---注册事件名(不加on 如"click")
 * @param {Function} fun	 ---回调函数
 *
 */
declare function myRemoveEvent(element: any, strType: any, fun: any): void;
