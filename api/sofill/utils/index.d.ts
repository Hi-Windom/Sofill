export { compareVersion, isEmpty, RangeLimitedInt, MoveDOM, MoveChildren, CopyDOM, isAppMode, removejscssfile, AddEvent, myRemoveEvent, diguiTooONE, };
declare function compareVersion(version1: any, version2: any): 0 | 1 | -1;
declare function isEmpty(obj: any): boolean;
declare function RangeLimitedInt(min: any, value1: any, max: any): number;
declare function CopyDOM(from: any, to: any): void;
declare function MoveDOM(from: any, to: any): void;
declare function MoveChildren(from: any, to: any): void;
declare function isAppMode(): boolean;
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
/**
 * 递归DOM元素查找深度子级的第一个符合条件的元素
 * @param {*} element 要查找DOM元素
 * @param {*} judgeFun 查找函数 : fun(v) return true or false
 * @returns element
 */
declare function diguiTooONE(element: any, judgeFun: any): any;
