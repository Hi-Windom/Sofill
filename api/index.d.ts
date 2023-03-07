export * from "./sofill";
export * from "./siyuan";
export { insertCreateBefore, };
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
