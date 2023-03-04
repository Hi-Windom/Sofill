import { 向思源请求数据 } from './siyuan/index';
export declare var API: {
    siyuan: {
        request: typeof 向思源请求数据;
        /**
         * 向指定父级创建追加一个子元素，并可选添加ID,
         * @param {Element} fatherElement
         * @param {string} addElementTxt 要创建添加的元素标签
         * @param {string} setId
         * @returns addElementObject
         */
        transactions: (protyle: any, transactions?: any[]) => Promise<any>;
        Account: {};
        Asset: {};
        Attr: {
            getBlockAttrs: (内容块id: any) => Promise<any>;
            setBlockAttrs: (内容块id: any, 属性对象: any) => Promise<any>;
            getBlockByID: (内容块id: any) => Promise<any>;
        };
        Av: {};
        Bazaar: {};
        Block: {
            getBlockKramdown: (内容块id: any) => Promise<any>;
            getBlockBreadcrumb: (ID: any) => Promise<any>;
            insertBlock: (previousID: any, dataType: any, data: any) => Promise<any>;
            prependBlock: (parentID: any, dataType: any, data: any) => Promise<any>;
            appendBlock: (parentID: any, dataType: any, data: any) => Promise<any>;
            deleteBlock: (id: any) => Promise<any>;
            updateBlock: (id: any, dataType: any, data: any) => Promise<any>;
        };
        /**
         * 向指定父级创建追加一个子元素，并可选添加ID,
         * @param {Element} fatherElement
         * @param {string} addElementTxt 要创建添加的元素标签
         * @param {string} setId
         * @returns addElementObject
         */
        Bookmark: {}; /**
        //  * 获得文本的占用的宽度
        //  * @param {*} text 字符串文班
        //  * @param {*} font 文本字体的样式
        //  * @returns
        //  */
        /**
         * 向指定父级创建追加一个子元素，并可选添加ID,
         * @param {Element} fatherElement
         * @param {string} addElementTxt 要创建添加的元素标签
         * @param {string} setId
         * @returns addElementObject
         */
        Export: {
            exportMdContent: (文档id: any) => Promise<any>;
        };
        File: {
            getFile: (path: any) => Promise<Response>;
            putFile: (path: any, filedata: any, isDir?: boolean, modTime?: number) => Promise<any>;
        };
        Filetree: {
            createDocWithMd: (notebook: any, path: any, markdown: any) => Promise<any>;
            removeDoc: (笔记本id: any, 文档路径: any) => Promise<any>;
            renameDoc: (笔记本id: any, 文档路径: any, 文档新标题: any) => Promise<any>;
            moveDoc: (源笔记本ID: any, 源路径: any, 目标笔记本ID: any, 目标路径: any) => Promise<any>;
            getHPathByPath: (笔记本ID: any, 路径: any) => Promise<any>;
            getHPathByID: (ID: any) => Promise<any>;
            listDocsByPath: (路径: any) => Promise<any>;
            getDoc: (id: any) => Promise<any>;
            searchDocs: (k: any) => Promise<any>;
        };
        Format: {};
        /**
         * 向指定父级创建追加一个子元素，并可选添加ID,
         * @param {Element} fatherElement
         * @param {string} addElementTxt 要创建添加的元素标签
         * @param {string} setId
         * @returns addElementObject
         */
        Graph: {
            getLocalGraph: (k: any, id: any, conf: any, reqId: any) => Promise<any>;
            getGraph: (k: any, conf: any, reqId: any) => Promise<any>;
        };
        History: {};
        Import: {};
        Inbox: {};
        Lute: {};
        Notebook: {
            createNotebook: (笔记本名称: any) => Promise<any>;
            removeNotebook: (笔记本id: any) => Promise<any>;
            setNotebookConf: (笔记本id: any) => Promise<any>;
            getNotebookConf: (笔记本id: any) => Promise<any>;
            openNotebook: (笔记本id: any) => Promise<any>;
            closeNotebook: (笔记本id: any) => Promise<any>;
            renameNotebook: (笔记本id: any, 笔记本的新名称: any) => Promise<any>;
        };
        Notification: {
            pushMsg: (message?: any, text?: any, timeout?: number) => Promise<any>;
            pushErrMsg: (message?: any, text?: any, timeout?: number) => Promise<any>;
        };
        Outline: {
            getDocOutline: (文档id: any) => Promise<any>;
        };
        /**
         * 向指定父级创建追加一个子元素，并可选添加ID,
         * @param {Element} fatherElement
         * @param {string} addElementTxt 要创建添加的元素标签
         * @param {string} setId
         * @returns addElementObject
         */
        Query: {
            sql: typeof import("./siyuan/query").以sql向思源请求块数据;
        };
        Ref: {
            getBacklink: (id: any) => Promise<any>;
        };
        Repo: {};
        Riff: {};
        Search: {
            searchEmbedBlock: (外部id数组: any, sql: any) => Promise<any>;
            searchBlock: (query: any) => Promise<any>;
            searchTemplate: (k: any) => Promise<any>;
        };
        Setting: {};
        Snippet: {};
        Storage: {};
        Sync: {};
        System: {};
        Tag: {
            getTag: () => Promise<any>;
        };
        Template: {
            docSaveAsTemplate: (id: any, overwrite?: boolean) => Promise<any>;
            render: (data: any) => Promise<any>;
        };
    };
    sofill: {
        Alert: {
            通知: typeof import("./sofill/alert").通知;
            pushMessage: (text: any) => void;
        };
        Utils: {
            compareVersion: (version1: any, version2: any) => 0 | 1 | -1;
            isEmpty: typeof import("./sofill/utils").isEmpty;
            RangeLimitedInt: (min: any, value1: any, max: any) => number;
            MoveDOM: (from: any, to: any) => void;
            MoveChildren: (from: any, to: any) => void;
            CopyDOM: (from: any, to: any) => void;
            isAppMode: () => boolean;
            removejscssfile: (filename: any, filetype: any) => void;
            AddEvent: (element: any, strType: any, fun: any) => void;
            myRemoveEvent: (element: any, strType: any, fun: any) => void;
            diguiTooONE: (element: any, judgeFun: any) => any;
        };
    };
};
export { insertCreateAfter, addinsertCreateElement, insertCreateBefore, };
/**
 * 向指定父级创建追加一个子元素，并可选添加ID,
 * @param {Element} fatherElement
 * @param {string} addElementTxt 要创建添加的元素标签
 * @param {string} setId
 * @returns addElementObject
 */
declare function addinsertCreateElement(fatherElement: any, addElementTxt: any, setId?: any): any;
/**
 * 向指定元素后创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
declare function insertCreateAfter(targetElement: any, addElementTxt: any, setId?: any): any;
/**
 * 获得所选择的块对应的块 ID
 * @returns {string} 块 ID
 * @returns {
 *     id: string, // 块 ID
 *     type: string, // 块类型
 *     subtype: string, // 块子类型(若没有则为 null)
 * }
 * @returns {null} 没有找到块 ID */
/**
 * 向指定元素前创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
declare function insertCreateBefore(targetElement: any, addElementTxt: any, setId?: any): any;
export declare function propInit(id: any, type: any): Promise<void>;
export declare function propChange(id: any, changeFn: any): Promise<void>;
export declare function checkedInit(obj: any): Promise<void>;
export declare function checkedChange(obj: any, YesFn: any, NoFn: any): Promise<void>;
