import { minWidth } from "./breakpoints";

export const gridBase = {
  paddingLeft: "1.25rem",
  paddingRight: "1.25rem",
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gridAutoColumns: "max-content",
  columnGap: "1.25rem",
  [minWidth.tablet]: {
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))"
  },
  [minWidth.wide]: {
    gridTemplateColumns: "repeat(16, minmax(0, 1fr))"
  }
};
