export declare var _File: {
    getFile: typeof 获取文件;
    putFile: typeof 写入文件;
};
declare function 获取文件(path: any): Promise<Response>;
declare function 写入文件(path: any, filedata: any, isDir?: boolean, modTime?: number): Promise<any>;
export {};
