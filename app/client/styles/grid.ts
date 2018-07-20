import { css } from "./emotion";
import { BreakpointQueries, minWidth, SomeBreakPoints } from "./breakpoints";

const gutter = 20;
const baseline = 12;
const width = 60;
const rowHeight = 36;

export const calculateWidth = (n: number) => n * width + (n - 1) * gutter;
export const calculateHeight = (n: number) =>
  n * rowHeight + (n - 1) * baseline;

export const span = (n: number) => ({
  width: `${calculateWidth(n)}px`
});

export interface BreakpointCSS {
  readonly [key: string]: {
    readonly width: string;
  };
}

export const spanBreakpoints: (
  bs: SomeBreakPoints,
  qs: BreakpointQueries
) => BreakpointCSS = (breakpoints, mqs = minWidth) => {
  const bs = breakpoints as { readonly [key: string]: number };
  const qs = mqs as { readonly [key: string]: string };
  return Object.entries(bs as { readonly [key: string]: number })
    .map(([k, v]) => (k in qs && v ? { [qs[k]]: span(v) } : {}))
    .reduce((a, c) => ({ ...a, ...c }), {});
};

export const cell = {
  flex: "1",
  display: "flex",
  padding: `${gutter}px 0 0 ${gutter}px`
};

export const row = {
  padding: `-${gutter}px 0 0 -${gutter}px`,
  display: "flex",
  margin: "auto"
};
