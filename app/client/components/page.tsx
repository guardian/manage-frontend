import { css } from "@emotion/core";
import { breakpoints } from "@guardian/src-foundations";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import React, { ReactElement } from "react";
import { minWidth } from "../styles/breakpoints";
// import { titlepiece } from "../styles/fonts"; TODO: add titlepiece back in with font usage overhaul
import { gridBase, gridColumns, gridItemPlacement } from "../styles/grid";
import { Nav, NavProps } from "./nav";

export interface PageNavAndContentContainerProps extends NavProps {
  children: React.ReactNode;
  withoutNav?: true;
}

export const PageNavAndContentContainer: React.SFC<PageNavAndContentContainerProps> = (
  props: PageNavAndContentContainerProps
) => (
  <div
    css={{
      ...gridBase,
      maxWidth: `calc(${breakpoints.wide}px + 2.5rem)`,
      margin: "0 auto",
      paddingBottom: "1rem",
      [minWidth.desktop]: {
        ...(gridBase[minWidth.desktop] as object),
        paddingBottom: "9rem"
      },
      [minWidth.wide]: {
        ...(gridBase[minWidth.wide] as object),
        paddingBottom: "12rem"
      }
    }}
  >
    {!props.withoutNav && (
      <nav
        css={{
          marginTop: `calc(-1 * (${space[5]}px + ${space[9]}px))`,
          display: "none",

          [minWidth.desktop]: {
            ...gridItemPlacement(1, 4),
            display: "block",
            paddingRight: "1.25rem"
          },

          [minWidth.wide]: {
            paddingRight: "0"
          }
        }}
      >
        <Nav {...props} />
      </nav>
    )}
    <section
      css={{
        ...gridItemPlacement(1, 4),

        [minWidth.tablet]: {
          ...gridItemPlacement(1, 12)
        },

        [minWidth.desktop]: {
          ...gridItemPlacement(5, 8)
        },

        [minWidth.wide]: {
          ...gridItemPlacement(6, 10)
        }
      }}
    >
      {props.children}
    </section>
  </div>
);

export interface PageContainerProps {
  noVerticalMargin?: true;
  children: React.ReactNode;
  fullWidth?: true;
}
export const PageContainer = (props: PageContainerProps) => (
  <div
    css={css`
      ${!props.fullWidth
        ? `
        margin: ${props.noVerticalMargin ? "0" : "1.8125rem"} auto 0;
        max-width: 980px;
      `
        : ""}
    `}
  >
    {props.children}
  </div>
);

// Thinner container, for readable text, etc
export const PageContainerSection: React.SFC<{}> = ({ children }) => (
  <div
    css={{
      margin: "1.8125rem auto 0"
    }}
  >
    {children}
  </div>
);

interface Breadcrumbs {
  title: string;
  link?: string;
  currentPage?: boolean;
}
export interface PageHeaderContainerProps extends NavProps {
  breadcrumbs?: Breadcrumbs[];
  title: string | ReactElement;
}

export const PageHeaderContainer: React.SFC<PageHeaderContainerProps> = (
  props: PageHeaderContainerProps
) => {
  const gridBasev2 = () => {
    return `
      display: grid;
      ms-grid-columns: (minmax(0, 1fr))[${gridColumns.default}];
      grid-template-columns: repeat(${gridColumns.default}, minmax(0, 1fr));
      grid-auto-columns: max-content;
      column-gap: ${space[5]}px;
      ${minWidth.tablet} {
        padding-left: ${space[5]}px;
        padding-right: ${space[5]}px;
        ms-grid-columns: (minmax(0, 1fr))[${gridColumns.tabletAndDesktop}];
        grid-template-columns: repeat(${gridColumns.tabletAndDesktop}, minmax(0, 1fr));
      };
      ${minWidth.wide} {
        ms-grid-columns: (minmax(0, 1fr))[${gridColumns.wide}];
        grid-template-columns: repeat(${gridColumns.wide}, minmax(0, 1fr));
      };
    `;
  };
  const gridItemPlacementv2 = (
    targetRow: number = 1,
    rowSpan: number = 1,
    startingPos: number,
    span: number,
    columnsBreakpoint: number = gridColumns.default
  ) => {
    return `
      grid-column-start: ${startingPos};
      grid-column-end: span ${span};
      grid-row-start: ${targetRow};
      grid-row-end: span ${rowSpan};
      ${startingPos > 0 && `ms-grid-column: ${startingPos};`}
      ${startingPos < 0 &&
        `ms-grid-column: ${columnsBreakpoint + 2 + startingPos};`}
      ms-grid-column-span: ${span};
      ms-grid-row: ${targetRow};
    `;
  };
  return (
    <div
      css={css`
        border-bottom: 1px solid ${palette.neutral["86"]};
        margin-left: auto;
        margin-right: auto;
        background: #0a1f47;
        ${minWidth.tablet} {
          ${!props.breadcrumbs && `padding-top: 100px;`}
        }
        ${minWidth.desktop} {
          position: relative;
        }
      `}
    >
      <div
        css={css`
          padding-left: ${space[3]}px;
          padding-right: ${space[3]}px;
          max-width: calc(${breakpoints.wide}px + 2.5rem);
          margin: auto;
          color: ${palette.neutral["100"]};
          ${gridBasev2()}
        `}
      >
        {props.breadcrumbs && (
          <div
            css={css`
              display: none;
              ${gridItemPlacementv2(1, 1, 1, 3)};
              ${minWidth.tablet} {
                display: block;
                padding: ${space[2]}px 0 0;
                min-height: 100px;
                ${gridItemPlacementv2(1, 1, 1, 10)};
              }
              ${minWidth.desktop} {
                ${gridItemPlacementv2(1, 1, 5, 8)};
              }
              ${minWidth.wide} {
                ${gridItemPlacementv2(1, 1, 6, 10)};
              }
            `}
          >
            {props.breadcrumbs.map((breadcrumbItem, index) => (
              <React.Fragment key={`breadcrumb-${index}`}>
                {breadcrumbItem.link ? (
                  <Link
                    to={breadcrumbItem.link}
                    css={css`
                      ${textSans.medium()};
                      color: ${palette.neutral[100]};
                    `}
                  >
                    {breadcrumbItem.title}
                  </Link>
                ) : (
                  <span
                    css={css`
                      ${textSans.medium({
                        fontWeight: breadcrumbItem.currentPage
                          ? "bold"
                          : "regular"
                      })};
                      color: ${palette.neutral[100]};
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
        )}
        <h1
          css={css`
            max-width: calc(${breakpoints.wide}px + 2.5rem);
            margin: 32px 0 0 0;
            color: ${palette.neutral["100"]};
            ${headline.medium({ fontWeight: "bold" })};
            font-size: 1.5rem;
            padding: 8px;
            border: 1px solid ${palette.brand.pastel};
            border-bottom: 0;
            ${minWidth.tablet} {
              line-height: 57px;
              margin-top: 0;
              padding: 0 8px;
            }

            ${props.breadcrumbs
              ? `
                ${gridItemPlacementv2(2, 1, 1, 4)};
                ${minWidth.mobileMedium} {
                  ${gridItemPlacementv2(2, 1, 1, 3)};
                };
                ${minWidth.tablet} {
                  ${gridItemPlacementv2(2, 1, 1, 10)};
                };
                ${minWidth.desktop} {
                  ${gridItemPlacementv2(2, 1, 5, 8)};
                  font-size: 2.625rem;
                };
                ${minWidth.wide} {
                  ${gridItemPlacementv2(2, 1, 6, 10)};
                };  
              `
              : `
                ${gridItemPlacementv2(1, 1, 1, 4)};
                ${minWidth.mobileMedium} {
                  ${gridItemPlacementv2(1, 1, 1, 3)};
                };
                ${minWidth.tablet} {
                  ${gridItemPlacementv2(1, 1, 1, 10)};
                };
                ${minWidth.desktop} {
                  ${gridItemPlacementv2(1, 1, 5, 8)};
                  font-size: 2.625rem;
                };
                ${minWidth.wide} {
                  ${gridItemPlacementv2(1, 1, 6, 10)};
                };
              `}
          `}
        >
          {props.title}
        </h1>
      </div>
    </div>
  );
};
