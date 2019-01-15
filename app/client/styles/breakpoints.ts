export interface Breakpoints {
  readonly mobile: number;
  readonly mobileMedium: number;
  readonly mobileLarge: number;
  readonly mobileLandscape: number;
  readonly phablet: number;
  readonly tablet: number;
  readonly desktop: number;
  readonly leftCol: number;
  readonly wide: number;
}

export type SomeBreakPoints = { [_ in keyof Breakpoints]?: number };

export type BreakpointQueries = { [_ in keyof Breakpoints]: string };

export const namedBreakpoints: Breakpoints = {
  mobile: 320,
  mobileMedium: 375,
  mobileLarge: 425,
  mobileLandscape: 480,
  phablet: 660,
  tablet: 740,
  desktop: 980,
  leftCol: 1140,
  wide: 1300
};

export const queries = {
  minWidth: (from: number): string => `@media (min-width: ${`${from}px`})`,
  maxWidth: (until: number): string =>
    `@media (max-width: ${`${until - 1}px`})`,
  minWidthMaxWidth: (from: number, until: number): string =>
    `@media (min-width: ${`${from}px`}) and (max-width: ${`${until - 1}px`})`
};

const mapBreakpointValues: (
  bs: Breakpoints,
  f: (x: number) => string
) => BreakpointQueries = (bs, f) => ({
  mobile: f(bs.mobile),
  mobileMedium: f(bs.mobileMedium),
  mobileLarge: f(bs.mobileLarge),
  mobileLandscape: f(bs.mobileLandscape),
  phablet: f(bs.phablet),
  tablet: f(bs.tablet),
  desktop: f(bs.desktop),
  leftCol: f(bs.leftCol),
  wide: f(bs.wide)
});

export const minWidth = mapBreakpointValues(namedBreakpoints, queries.minWidth);
export const maxWidth = mapBreakpointValues(namedBreakpoints, queries.maxWidth);
