export declare var Template: {
    docSaveAsTemplate: typeof 导出模板;
    renderTemplate: typeof 渲染模板;
};
declare function 导出模板(id: any, overwrite?: boolean): Promise<any>;
declare function 渲染模板(data: any): Promise<any>;
export {};
