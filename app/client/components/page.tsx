import { breakpoints } from "@guardian/src-foundations";
import { palette } from "@guardian/src-foundations";
import React from "react";
import { minWidth } from "../styles/breakpoints";
import { headline } from "../styles/fonts";
import { gridBase } from "../styles/grid";
import { Nav, NavProps } from "./nav";

export interface PageNavAndContentContainerProps extends NavProps {
  children: React.ReactNode;
}

export const PageNavAndContentContainer: React.SFC<
  PageNavAndContentContainerProps
> = (props: PageNavAndContentContainerProps) => (
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
    <nav
      css={{
        gridColumnStart: 1,
        marginTop: "calc(-1 * (1.25rem + 36px))",
        display: "none",

        [minWidth.desktop]: {
          display: "block",
          gridColumnEnd: "span 4",
          paddingRight: "1.25rem"
        },

        [minWidth.wide]: {
          paddingRight: "0"
        }
      }}
    >
      <Nav {...props} />
    </nav>
    <section
      css={{
        gridColumnStart: 1,
        gridColumnEnd: "span 4 ",

        [minWidth.tablet]: {
          gridColumnStart: 1,
          gridColumnEnd: "span 11"
        },

        [minWidth.desktop]: {
          gridColumnStart: 5,
          gridColumnEnd: "span 7"
        },

        [minWidth.wide]: {
          gridColumnStart: 6,
          gridColumnEnd: "span 9"
        }
      }}
    >
      {props.children}
    </section>
  </div>
);

// Standard width, centered container
export const PageContainer: React.SFC<{ noVerticalMargin?: true }> = ({
  children,
  noVerticalMargin
}) => (
  <div
    css={{
      margin: (noVerticalMargin ? "0" : "1.8125rem") + " auto 0"
    }}
  >
    {children}
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

export interface PageHeaderContainerProps extends NavProps {
  children: React.ReactNode;
}

export const PageHeaderContainer: React.SFC<PageHeaderContainerProps> = (
  props: PageHeaderContainerProps
) => (
  <div
    css={{
      borderBottom: `1px solid ${palette.neutral["86"]}`,
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop: "2rem",
      background: "#0A1F47",
      [minWidth.desktop]: {
        paddingTop: "7rem",
        maxHeight: "calc(7em + 57px)"
      }
    }}
  >
    <div
      css={{
        ...gridBase,
        maxWidth: `calc(${breakpoints.wide}px + 2.5rem)`,
        margin: "auto",
        color: palette.neutral["100"],
        "& h1": {
          fontSize: "1.5rem",
          lineHeight: "2rem",
          fontFamily: headline,
          fontWeight: "bold"
        },
        "> h1, > div": {
          margin: 0,
          padding: "0 6px 8px",
          border: `1px solid ${palette.brand.pastel}`,
          gridColumnStart: 1,
          gridColumnEnd: "span 3",
          [minWidth.tablet]: {
            gridColumnEnd: "span 10"
          },
          [minWidth.desktop]: {
            fontSize: "2.625rem",
            lineHeight: "2rem",
            maxHeight: "56px",
            padding: "8px 8px 20px",
            gridColumnStart: 5,
            gridColumnEnd: "span 8"
          },
          [minWidth.wide]: {
            gridColumnStart: 6,
            gridColumnEnd: "span 10"
          }
        }
      }}
    >
      {props.children}
    </div>
  </div>
);
