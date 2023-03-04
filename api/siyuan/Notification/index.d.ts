export declare var Notification: {
    pushMsg: typeof 推送消息;
    pushErrMsg: typeof 推送报错消息;
};
declare function 推送消息(message?: any, text?: any, timeout?: number): Promise<any>;
declare function 推送报错消息(message?: any, text?: any, timeout?: number): Promise<any>;
export {};
