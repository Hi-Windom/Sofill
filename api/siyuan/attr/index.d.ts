export declare var Attr: {
    getBlockAttrs: typeof getBlockAttrs;
    setBlockAttrs: typeof setBlockAttrs;
    queryBlockById: typeof queryBlockById;
};
declare function getBlockAttrs(id: string): Promise<any>;
declare function queryBlockById(id: string): Promise<any>;
declare function setBlockAttrs(id: string, attrs: any): Promise<any>;
export {};
