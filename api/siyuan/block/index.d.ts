export declare var Block: {
    getBlockKramdown: typeof 获取块kramdown源码;
    getBlockBreadcrumb: typeof 获取块面包屑;
    insertBlock: typeof 插入块;
    prependBlock: typeof 插入前置子块;
    appendBlock: typeof 插入后置子块;
    deleteBlock: typeof 删除块;
    updateBlock: typeof 更新块;
};
declare function 获取块kramdown源码(内容块id: any): Promise<any>;
declare function 获取块面包屑(ID: any): Promise<any>;
declare function 插入块(previousID: any, dataType: any, data: any): Promise<any>;
declare function 插入前置子块(parentID: any, dataType: any, data: any): Promise<any>;
declare function 插入后置子块(parentID: any, dataType: any, data: any): Promise<any>;
declare function 更新块(id: any, dataType: any, data: any): Promise<any>;
declare function 删除块(id: any): Promise<any>;
export {};
