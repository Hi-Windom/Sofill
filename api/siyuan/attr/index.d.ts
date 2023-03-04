export declare var Attr: {
    getBlockAttrs: typeof 以id获取思源块属性;
    setBlockAttrs: typeof 设置思源块属性;
    getBlockByID: typeof 以id获取思源块信息;
};
declare function 以id获取思源块属性(内容块id: any): Promise<any>;
declare function 以id获取思源块信息(内容块id: any): Promise<any>;
declare function 设置思源块属性(内容块id: any, 属性对象: any): Promise<any>;
export {};
