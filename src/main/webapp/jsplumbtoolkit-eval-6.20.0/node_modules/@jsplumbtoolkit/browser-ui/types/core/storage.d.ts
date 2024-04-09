export declare const Storage: {
    set: (key: string, value: any) => void;
    get: (key: string) => any;
    clear: (key: string) => void;
    clearAll: () => void;
    setJSON: (key: string, value: any) => void;
    getJSON: (key: string) => any;
};
