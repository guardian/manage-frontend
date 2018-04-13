import { SomeBreakPoints, BreakpointQueries } from './breakpoints';
export declare const calculateWidth: (n: number) => number;
export declare const calculateHeight: (n: number) => number;
export declare const span: (n: number) => {
    width: string;
};
export interface BreakpointCSS {
    [key: string]: {
        width: string;
    };
}
export declare const spanBreakpoints: (bs: SomeBreakPoints, qs: BreakpointQueries) => BreakpointCSS;
export declare const cell: {
    flex: string;
    display: string;
    padding: string;
};
export declare const row: {
    padding: string;
    display: string;
    margin: string;
};
