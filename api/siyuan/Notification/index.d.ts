export { 通知, pushMsg, };
/**
 * @deprecated 过时的
 */
declare function 通知(text: any, timeout?: number): void;
declare function pushMsg(msg: string, timeout?: number): Promise<any>;
