export declare var Filetree: {
    createDocWithMd: typeof createDocWithMd;
    removeDoc: typeof removeDoc;
    renameDoc: typeof renameDoc;
    moveDoc: typeof moveDoc;
    getHPathByPath: typeof getHPathByPath;
    getHPathByID: typeof getHPathByID;
    listDocsByPath: typeof listDocsByPath;
    getDoc: typeof getDoc;
    searchDocs: typeof searchDocs;
};
/**
 * 列出指定路径下文档
 * @date 2023-03-26
 * @param { * } path
 */
declare function listDocsByPath(path: any): Promise<any>;
/**
 * 以id获取文档内容
 * @date 2023-03-26
 * @param { * } id
 */
declare function getDoc(id: any): Promise<any>;
/**
 * 以关键词搜索文档
 * @date 2023-03-26
 * @param { * } k 关键词
 */
declare function searchDocs(k: any): Promise<any>;
/**
 * 重命名思源文档
 * @date 2023-03-26
 * @param { * } notebook 笔记本id
 * @param { * } path 文档路径
 * @param { * } title 文档新标题
 */
declare function renameDoc(notebook: any, path: any, title: any): Promise<any>;
/**
 * 删除思源文档
 * @date 2023-03-26
 * @param { * } notebook 笔记本id
 * @param { * } path 文档路径
 */
declare function removeDoc(notebook: any, path: any): Promise<any>;
/**
 * 移动思源文档
 * @date 2023-03-26
 * @param { * } fromNotebook 源笔记本ID
 * @param { * } fromPath 源路径
 * @param { * } toNotebook 目标笔记本ID
 * @param { * } toPath 目标路径
 */
declare function moveDoc(fromNotebook: any, fromPath: any, toNotebook: any, toPath: any): Promise<any>;
/**
 * 根据思源路径获取人类可读路径
 * @date 2023-03-25
 * @param { * } Notebook 笔记本ID
 * @param { * } Path 路径
 */
declare function getHPathByPath(Notebook: any, Path: any): Promise<any>;
/**
 * 根据块ID查询文档人类可读完整路径
 * @date 2023-03-25
 * @param { * } ID
 */
declare function getHPathByID(ID: any): Promise<any>;
/**
 * 通过markdown创建文档
 * @date 2023-03-26
 * @param { * } notebook
 * @param { * } path
 * @param { * } markdown
 */
declare function createDocWithMd(notebook: any, path: any, markdown: any): Promise<any>;
export {};
