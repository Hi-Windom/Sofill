export declare var Search: {
    searchEmbedBlock: typeof 以sql获取嵌入块内容;
    searchBlock: typeof 以关键词搜索块;
    searchTemplate: typeof 以关键词搜索模板;
};
declare function 以sql获取嵌入块内容(外部id数组: any, sql: any): Promise<any>;
declare function 以关键词搜索块(query: any): Promise<any>;
declare function 以关键词搜索模板(k: any): Promise<any>;
export {};
