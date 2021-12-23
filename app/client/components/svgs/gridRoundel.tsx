import { minWidth } from "../../styles/breakpoints";
import { gridColumns, gridItemPlacement } from "../../styles/grid";
import { Roundel, RoundelProps } from "./roundel";

export const GridRoundel = (props: RoundelProps) => (
  <div
    css={{
      ...gridItemPlacement(-2, 1),
      display: "inline-block",
      [minWidth.tablet]: {
        margin: "auto",
        maxHeight: "51px",
        ...gridItemPlacement(-2, 1, gridColumns.tabletAndDesktop),
      },
      [minWidth.wide]: {
        ...gridItemPlacement(-2, 1, gridColumns.wide),
      },
    }}
  >
    <Roundel {...props} />
  </div>
);
