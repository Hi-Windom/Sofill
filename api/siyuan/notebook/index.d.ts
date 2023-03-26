export declare var Notebook: {
    createNotebook: typeof createNotebook;
    removeNotebook: typeof removeNotebook;
    setNotebookConf: typeof setNotebookConf;
    getNotebookConf: typeof getNotebookConf;
    openNotebook: typeof openNotebook;
    closeNotebook: typeof closeNotebook;
    renameNotebook: typeof renameNotebook;
};
/**
 * 删除思源笔记本
 * @date 2023-03-26
 * @param { * } notebook 笔记本id
 */
declare function removeNotebook(notebook: any): Promise<any>;
/**
 * 获取思源笔记本配置
 * @date 2023-03-26
 * @param { * } notebook 笔记本id
 */
declare function getNotebookConf(notebook: any): Promise<any>;
/**
 * 保存思源笔记本配置
 * @date 2023-03-26
 * @param { * } notebook 笔记本id
 */
declare function setNotebookConf(notebook: any): Promise<any>;
/**
 * 打开思源笔记本
 * @date 2023-03-26
 * @param { string } id
 */
declare function openNotebook(id: string): Promise<any>;
/**
 * 关闭思源笔记本
 * @date 2023-03-26
 * @param { string } id
 */
declare function closeNotebook(id: string): Promise<any>;
/**
 * 重命名思源笔记本
 * @date 2023-03-26
 * @param { * } notebook 笔记本id
 * @param { * } name 笔记本的新名称
 */
declare function renameNotebook(notebook: any, name: any): Promise<any>;
/**
 * 新建思源笔记本
 * @date 2023-03-26
 * @param { * } name
 */
declare function createNotebook(name: any): Promise<any>;
export {};
