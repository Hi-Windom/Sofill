export declare var Attr: {
    getBlockAttrs: typeof getBlockAttrs;
    setBlockAttrs: typeof setBlockAttrs;
    queryBlockById: typeof queryBlockById;
};
declare function getBlockAttrs(内容块id: any): Promise<any>;
declare function queryBlockById(内容块id: any): Promise<any>;
declare function setBlockAttrs(内容块id: any, 属性对象: any): Promise<any>;
export {};
