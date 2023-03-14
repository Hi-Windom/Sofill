export declare function getActualWidthOfChars(text: any, options: {
    size: string | number;
    family?: string;
}): number;
/**
 * 向指定父级创建追加一个子元素，并可选添加ID,
 * @param {Element} fatherElement
 * @param {string} addElementTxt 要创建添加的元素标签
 * @param {string} setId
 * @returns addElementObject
 */
export declare function addinsertCreateElement(fatherElement: Element, addElementTxt: string, setId?: string): HTMLElement;
/**
 * 向指定元素后创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
export declare function insertCreateAfter(targetElement: any, addElementTxt: any, setId?: any): any;
/**
 * 递归DOM元素查找深度子级的第一个符合条件的元素
 * @param {*} element 要查找DOM元素
 * @param {*} judgeFun 查找函数 : fun(v) return true or false
 * @returns element
 */
export declare function diguiTooONE(element: any, judgeFun: any): any;
export declare function CopyDOM(from: any, to: any): void;
export declare function MoveDOM(from: any, to: any): void;
export declare function MoveChildren(from: any, to: any): void;
export declare const bodyAC: (N: string) => void;
export declare const bodyRC: (N: string) => void;
export declare const bodyCC: (N: string) => boolean;
export declare const eSetProperty: (p: string, pv: string) => void;
export declare const eRemoveProperty: (p: string) => void;
