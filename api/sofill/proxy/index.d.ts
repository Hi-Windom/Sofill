export * from './CP';
export declare const getNewValueFromDomByID: (id: any) => Promise<any>;
export declare function propChange(id: any, changeFn: any): Promise<void>;
export declare function checkedChange(obj: any, YesFn: any, NoFn: any): Promise<void>;
export declare const SofillDate: {
    isDuringDate: (beginDateStr: any, endDateStr: any) => boolean;
    isDuringTime: (beginTimeStr: any, endTimeStr: any) => boolean;
};
export declare function getUrlParam(urlStr: any, urlKey: any): string;
export declare function getUrlParams(urlStr: any): string[];
