export declare var Filetree: {
    createDocWithMd: typeof 通过markdown创建文档;
    removeDoc: typeof removeDoc;
    renameDoc: typeof renameDoc;
    moveDoc: typeof moveDoc;
    getHPathByPath: typeof getHPathByPath;
    getHPathByID: typeof getHPathByID;
    listDocsByPath: typeof 列出指定路径下文档;
    getDoc: typeof 以id获取文档内容;
    searchDocs: typeof 以关键词搜索文档;
};
declare function renameDoc(笔记本id: any, 文档路径: any, 文档新标题: any): Promise<any>;
declare function removeDoc(笔记本id: any, 文档路径: any): Promise<any>;
declare function moveDoc(源笔记本ID: any, 源路径: any, 目标笔记本ID: any, 目标路径: any): Promise<any>;
/**
 * 根据思源路径获取人类可读路径
 * @date 2023-03-25
 * @param { * } 笔记本ID
 * @param { * } 路径
 */
declare function getHPathByPath(笔记本ID: any, 路径: any): Promise<any>;
/**
 * 根据块ID查询文档人类可读完整路径
 * @date 2023-03-25
 * @param { * } ID
 */
declare function getHPathByID(ID: any): Promise<any>;
declare function 通过markdown创建文档(notebook: any, path: any, markdown: any): Promise<any>;
declare function 列出指定路径下文档(路径: any): Promise<any>;
declare function 以id获取文档内容(id: any): Promise<any>;
declare function 以关键词搜索文档(k: any): Promise<any>;
export {};
