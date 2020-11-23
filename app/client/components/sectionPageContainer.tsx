import { css } from "@emotion/core";
import { breakpoints, palette, space } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import React, { ReactNode } from "react";
import { minWidth } from "../styles/breakpoints";
import { gridBase, gridItemPlacement } from "../styles/grid";

interface SectionPageContainerProps {
  sectionTitle: string;
  children: ReactNode;
}

export const SectionPageContainer = (props: SectionPageContainerProps) => (
  <div
    css={{
      maxWidth: `${breakpoints.wide}px`,
      margin: "0 auto",
      paddingTop: `${space[12]}px`,
      borderLeft: `1px solid ${palette.neutral[86]}`,
      borderRight: `1px solid ${palette.neutral[86]}`,
      height: "100%"
    }}
  >
    <div
      css={{
        ...gridBase,
        paddingBottom: "1rem",
        [minWidth.desktop]: {
          ...(gridBase[minWidth.desktop] as object),
          paddingBottom: 0,
          borderTop: `1px solid ${palette.neutral[86]}`
        },
        [minWidth.wide]: {
          ...(gridBase[minWidth.wide] as object)
        }
      }}
    >
      <div
        css={{
          display: "none",

          [minWidth.desktop]: {
            ...gridItemPlacement(1, 3),
            display: "block",
            paddingRight: 0
          },

          [minWidth.wide]: {
            ...gridItemPlacement(1, 3)
          }
        }}
      >
        <h3
          css={css`
            ${headline.xxxsmall({ fontWeight: "bold" })};
            margin: 0;
            padding: ${space[2]}px 0;
            border-right: 1px solid ${palette.neutral[86]};
          `}
        >
          {props.sectionTitle}
        </h3>
      </div>
      <section
        css={{
          ...gridItemPlacement(1, 4),

          [minWidth.tablet]: {
            ...gridItemPlacement(1, 12)
          },

          [minWidth.desktop]: {
            ...gridItemPlacement(4, 9)
          },

          [minWidth.wide]: {
            ...gridItemPlacement(4, 12)
          }
        }}
      >
        {props.children}
      </section>
    </div>
  </div>
);
