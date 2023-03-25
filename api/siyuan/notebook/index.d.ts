export declare var Notebook: {
    createNotebook: typeof 新建思源笔记本;
    removeNotebook: typeof 删除思源笔记本;
    setNotebookConf: typeof 保存思源笔记本配置;
    getNotebookConf: typeof 获取思源笔记本配置;
    openNotebook: typeof openNotebook;
    closeNotebook: typeof closeNotebook;
    renameNotebook: typeof 重命名思源笔记本;
};
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
declare function 重命名思源笔记本(笔记本id: any, 笔记本的新名称: any): Promise<any>;
declare function 新建思源笔记本(笔记本名称: any): Promise<any>;
declare function 删除思源笔记本(笔记本id: any): Promise<any>;
declare function 获取思源笔记本配置(笔记本id: any): Promise<any>;
declare function 保存思源笔记本配置(笔记本id: any): Promise<any>;
export {};
