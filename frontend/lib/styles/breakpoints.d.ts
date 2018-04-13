export interface Breakpoints {
    readonly mobile: number;
    readonly mobileMedium: number;
    readonly mobileLandscape: number;
    readonly phablet: number;
    readonly tablet: number;
    readonly desktop: number;
    readonly leftCol: number;
    readonly wide: number;
}
export declare type SomeBreakPoints = {
    [_ in keyof Breakpoints]?: number;
};
export declare type BreakpointQueries = {
    [_ in keyof Breakpoints]: string;
};
export declare const namedBreakpoints: Breakpoints;
export declare const queries: {
    minWidth: (from: number) => string;
    maxWidth: (until: number) => string;
    minWidthMaxWidth: (from: number, until: number) => string;
};
export declare const minWidth: BreakpointQueries;
export declare const maxWidth: BreakpointQueries;
