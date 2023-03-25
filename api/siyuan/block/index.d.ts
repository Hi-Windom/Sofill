export declare var Block: {
    getBlockKramdown: typeof getBlockKramdown;
    getBlockBreadcrumb: typeof getBlockBreadcrumb;
    insertBlock: typeof insertBlock;
    prependBlock: typeof 插入前置子块;
    appendBlock: typeof 插入后置子块;
    deleteBlock: typeof 删除块;
    updateBlock: typeof 更新块;
};
declare function getBlockKramdown(id: string): Promise<any>;
declare function getBlockBreadcrumb(id: string): Promise<any>;
declare function insertBlock(previousID: any, dataType: any, data: any): Promise<any>;
declare function 插入前置子块(parentID: any, dataType: any, data: any): Promise<any>;
declare function 插入后置子块(parentID: any, dataType: any, data: any): Promise<any>;
declare function 更新块(id: any, dataType: any, data: any): Promise<any>;
declare function 删除块(id: any): Promise<any>;
export {};
