interface Breakpoints {
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

type BreakpointQueries = { [_ in keyof Breakpoints]: string };

const namedBreakpoints: Breakpoints = {
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

const toMediaQuery = (
  bound: "min" | "max",
  dimension: "width" | "height",
  value: number
) => `@media (${bound}-${dimension}: ${value}px)`;

export const queries = {
  minWidth: (from: number): string => toMediaQuery("min", "width", from),
  maxWidth: (until: number): string => toMediaQuery("max", "width", until - 1),
  minHeight: (from: number): string => toMediaQuery("min", "height", from),
  maxHeight: (until: number): string => toMediaQuery("max", "height", until - 1)
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
