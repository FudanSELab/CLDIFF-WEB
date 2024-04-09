export declare const BPMN2_SHAPES: {
    id: string;
    name: string;
    shapes: {
        task: {
            type: string;
            label: string;
            template: string;
            payload: {
                taskType: string;
            };
        };
        transaction: {
            type: string;
            label: string;
            template: string;
        };
        "call-activity": {
            type: string;
            label: string;
            template: string;
        };
        "start-event": {
            type: string;
            label: string;
            template: string;
        };
        "end-event": {
            type: string;
            label: string;
            template: string;
        };
        "intermediate-event": {
            type: string;
            label: string;
            template: string;
        };
    };
    icons: {
        message: {
            template: string;
            viewBox: {
                width: number;
                height: number;
            };
        };
        send: {
            template: string;
            viewBox: {
                width: number;
                height: number;
            };
        };
        receive: {
            template: string;
            viewBox: {
                width: number;
                height: number;
            };
        };
        signal: {
            template: string;
            viewBox: {
                width: number;
                height: number;
            };
        };
    };
};
