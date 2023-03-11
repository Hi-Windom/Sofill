export declare var Template: {
    docSaveAsTemplate: typeof docSaveAsTemplate;
    renderTemplate: typeof renderTemplate;
};
declare function docSaveAsTemplate(id: any, overwrite?: boolean): Promise<any>;
declare function renderTemplate(data: any): Promise<any>;
export {};
