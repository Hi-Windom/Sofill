export declare var Search: {
    searchEmbedBlock: typeof queryEmbedBlock;
    searchBlock: typeof queryBlock;
    searchTemplate: typeof queryTemplate;
};
declare function queryEmbedBlock(ids: any, sql: any): Promise<any>;
declare function queryBlock(query: any): Promise<any>;
declare function queryTemplate(k: any): Promise<any>;
export {};
