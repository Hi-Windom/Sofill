export * as sofill from "./sofill/index";
export * as siyuan from "./siyuan/index";
export { insertCreateAfter, addinsertCreateElement, insertCreateBefore, };
/**
 * 向指定父级创建追加一个子元素，并可选添加ID,
 * @param {Element} fatherElement
 * @param {string} addElementTxt 要创建添加的元素标签
 * @param {string} setId
 * @returns addElementObject
 */
declare function addinsertCreateElement(fatherElement: any, addElementTxt: any, setId?: any): any;
/**
 * 向指定元素后创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
declare function insertCreateAfter(targetElement: any, addElementTxt: any, setId?: any): any;
/**
 * 获得所选择的块对应的块 ID
 * @returns {string} 块 ID
 * @returns {
 *     id: string, // 块 ID
 *     type: string, // 块类型
 *     subtype: string, // 块子类型(若没有则为 null)
 * }
 * @returns {null} 没有找到块 ID */
/**
 * 向指定元素前创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
declare function insertCreateBefore(targetElement: any, addElementTxt: any, setId?: any): any;
export declare function propChange(id: any, changeFn: any): Promise<void>;
export declare function checkedInit(obj: any): Promise<void>;
export declare function checkedChange(obj: any, YesFn: any, NoFn: any): Promise<void>;
