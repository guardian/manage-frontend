import { minWidth } from "./breakpoints";

export const gridColumns = {
  default: 4,
  tabletAndDesktop: 12,
  wide: 16
};

export const gridBase = {
  paddingLeft: "1.25rem",
  paddingRight: "1.25rem",
  display: "-ms-grid",
  "@supports (display: grid)": {
    display: "grid"
  },
  msGridColumns: `(minmax(0, 1fr))[${gridColumns.default}]`,
  gridTemplateColumns: `repeat(${gridColumns.default}, minmax(0, 1fr))`,

  gridAutoColumns: "max-content",
  columnGap: "1.25rem",
  [minWidth.tablet]: {
    msGridColumns: `(minmax(0, 1fr))[${gridColumns.tabletAndDesktop}]`,
    gridTemplateColumns: `repeat(${
      gridColumns.tabletAndDesktop
    }, minmax(0, 1fr))`
  },
  [minWidth.wide]: {
    msGridColumns: `(minmax(0, 1fr))[${gridColumns.wide}]`,
    gridTemplateColumns: `repeat(${gridColumns.wide}, minmax(0, 1fr))`
  }
};

export const gridItemPlacement = (
  startingPos: number,
  span: number,
  columnsBreakpoint: number = gridColumns.default
): object => {
  return {
    gridColumnStart: `${startingPos}`,
    gridColumnEnd: `span ${span}`,
    ...(startingPos > 0 && { msGridColumn: `${startingPos}` }),
    ...(startingPos < 0 && {
      msGridColumn: `${columnsBreakpoint + 2 + startingPos}`
    }),
    msGridColumnSpan: `${span}`,
    msGridRow: "1"
  };
};
