import { css } from "@emotion/core";
import { breakpoints, palette, space } from "@guardian/src-foundations";
import { textSans, titlepiece } from "@guardian/src-foundations/typography";
import React from "react";
import { minWidth } from "../styles/breakpoints";
import { gridBase, gridItemPlacement } from "../styles/grid";
import { Breadcrumbs } from "./page";

interface SectionHeaderProps {
  title: string | JSX.Element;
  breadcrumbs?: Breadcrumbs[];
}

export const SectionHeader = (props: SectionHeaderProps) => (
  <header
    css={{
      backgroundColor: palette.neutral[93]
    }}
  >
    <div
      css={{
        ...gridBase,
        maxWidth: `${breakpoints.wide}px`,
        margin: "0 auto",
        borderLeft: `1px solid ${palette.neutral[86]}`,
        borderRight: `1px solid ${palette.neutral[86]}`,

        [minWidth.desktop]: {
          ...(gridBase[minWidth.desktop] as object)
        },
        [minWidth.wide]: {
          ...(gridBase[minWidth.wide] as object)
        }
      }}
    >
      <div
        css={{
          display: "none",
          marginTop: `${space[3]}px`,
          [minWidth.desktop]: {
            ...gridItemPlacement(1, 3),
            display: "block"
          }
        }}
      >
        {props.breadcrumbs?.map((breadcrumbItem, index) => (
          <React.Fragment key={`breadcrumb-${index}`}>
            {breadcrumbItem.link ? (
              <a
                href={breadcrumbItem.link}
                css={css`
                  ${textSans.medium()};
                  color: ${palette.neutral[0]};
                `}
              >
                {breadcrumbItem.title}
              </a>
            ) : (
              <span
                css={css`
                  ${textSans.medium({
                    fontWeight: breadcrumbItem.currentPage ? "bold" : "regular"
                  })};
                  color: ${palette.neutral[0]};
                `}
              >
                {breadcrumbItem.title}
              </span>
            )}
            {props.breadcrumbs?.length &&
              index < props.breadcrumbs?.length - 1 && <span>{" / "}</span>}
          </React.Fragment>
        ))}
      </div>
      <h1
        css={{
          font: titlepiece.small(),
          fontSize: "24px",
          ...gridItemPlacement(1, 4),
          margin: `${space[9]}px 0 0 0`,
          padding: `${space[3]}px 0`,

          [minWidth.tablet]: {
            ...gridItemPlacement(1, 12)
          },

          [minWidth.desktop]: {
            ...gridItemPlacement(4, 9),
            fontSize: "42px",
            paddingLeft: `${space[5]}px`,
            marginTop: `${space[24]}px`,
            marginLeft: `-${space[5]}px`,
            borderLeft: `1px solid ${palette.neutral[86]}`,
            borderTop: `1px solid ${palette.neutral[86]}`
          },
          [minWidth.wide]: {
            ...gridItemPlacement(4, 13)
          }
        }}
      >
        {props.title}
      </h1>
    </div>
  </header>
);
