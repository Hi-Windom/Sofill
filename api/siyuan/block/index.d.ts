export declare var Block: {
    getBlockKramdown: typeof getBlockKramdown;
    getBlockBreadcrumb: typeof getBlockBreadcrumb;
    insertBlock: typeof insertBlock;
    prependBlock: typeof prependBlock;
    appendBlock: typeof appendBlock;
    deleteBlock: typeof deleteBlock;
    updateBlock: typeof updateBlock;
};
/**
 * 获取块kramdown源码
 * @date 2023-03-26
 * @param { string } id
 */
declare function getBlockKramdown(id: string): Promise<any>;
/**
 * 获取块面包屑
 * @date 2023-03-26
 * @param { string } id
 */
declare function getBlockBreadcrumb(id: string): Promise<any>;
/**
 * desc
 * @date 2023-03-26
 * @param { * } previousID
 * @param { * } dataType
 * @param { * } data
 */
declare function insertBlock(previousID: any, dataType: any, data: any): Promise<any>;
/**
 * 插入前置子块
 * @date 2023-03-26
 * @param { * } parentID
 * @param { * } dataType
 * @param { * } data
 */
declare function prependBlock(parentID: any, dataType: any, data: any): Promise<any>;
/**
 * 插入后置子块
 * @date 2023-03-26
 * @param { * } parentID
 * @param { * } dataType
 * @param { * } data
 */
declare function appendBlock(parentID: any, dataType: any, data: any): Promise<any>;
/**
 * 更新块
 * @date 2023-03-26
 * @param { * } id
 * @param { * } dataType
 * @param { * } data
 */
declare function updateBlock(id: any, dataType: any, data: any): Promise<any>;
/**
 * 删除块
 * @date 2023-03-26
 * @param { * } id
 */
declare function deleteBlock(id: any): Promise<any>;
export {};
