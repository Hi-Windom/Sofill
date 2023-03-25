export declare var Graph: {
    getLocalGraph: typeof getLocalGraph;
    getGraph: typeof getGraph;
};
/**
 * 以id获取局部图谱
 * @date 2023-03-26
 * @param { * } k
 * @param { * } id
 * @param { * } conf
 * @param { * } reqId
 */
declare function getLocalGraph(k: any, id: any, conf: any, reqId: any): Promise<any>;
/**
 * 获取全局图谱
 * @date 2023-03-26
 * @param { * } k
 * @param { * } conf
 * @param { * } reqId
 */
declare function getGraph(k: any, conf: any, reqId: any): Promise<any>;
export {};
