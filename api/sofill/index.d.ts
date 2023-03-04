export declare var sofill: {
    Alert: {
        通知: typeof import("./alert").通知;
        pushMessage: (text: any) => void;
    };
    Utils: {
        compareVersion: (version1: any, version2: any) => 0 | 1 | -1;
        isEmpty: typeof import("./utils").isEmpty;
        RangeLimitedInt: (min: any, value1: any, max: any) => number;
        MoveDOM: (from: any, to: any) => void;
        MoveChildren: (from: any, to: any) => void;
        CopyDOM: (from: any, to: any) => void;
        isAppMode: () => boolean;
        removejscssfile: (filename: any, filetype: any) => void;
        AddEvent: (element: any, strType: any, fun: any) => void;
        myRemoveEvent: (element: any, strType: any, fun: any) => void;
        diguiTooONE: (element: any, judgeFun: any) => any;
    };
};
