export declare function 通知(text: any, timeout?: number): void;
/**
 * @deprecated 过时的
 */
declare function pushMessage(text: any): void;
export declare var Alert: {
    通知: typeof 通知;
    pushMessage: typeof pushMessage;
};
export {};