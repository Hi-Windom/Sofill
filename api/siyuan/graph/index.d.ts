export declare var Graph: {
    getLocalGraph: typeof 以id获取局部图谱;
    getGraph: typeof 获取全局图谱;
};
declare function 以id获取局部图谱(k: any, id: any, conf: any, reqId: any): Promise<any>;
declare function 获取全局图谱(k: any, conf: any, reqId: any): Promise<any>;
export {};
