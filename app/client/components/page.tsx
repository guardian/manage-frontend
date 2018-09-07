import React from "react";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { Nav } from "./nav";

// Standard width, centered container
export const PageContainer: React.SFC<{ noVerticalMargin?: true }> = ({
  children,
  noVerticalMargin
}) => (
  <div
    css={{
      maxWidth: "980px",
      margin: (noVerticalMargin ? "0" : "1.8125rem") + " auto 0",
      padding: "0 0.625rem",

      [minWidth.tablet]: {
        padding: "0 1.25rem"
      }
    }}
  >
    {children}
  </div>
);

// Thinner container, for readable text, etc
export const PageContainerSection: React.SFC<{}> = ({ children }) => (
  <div
    css={{
      maxWidth: "calc(45rem + 1.25rem)",
      margin: "1.8125rem auto 0",
      padding: "0 0.625rem",

      [minWidth.tablet]: {
        maxWidth: "calc(45rem + 2.5rem)",
        padding: "0 1.25rem"
      }
    }}
  >
    {children}
  </div>
);

export const PageHeaderContainer: React.SFC<{}> = ({ children }) => (
  <div
    css={{
      borderBottom: `1px solid ${palette.neutral["5"]}`,
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop: "0.3125rem"
    }}
  >
    <div
      css={{
        maxWidth: "980px",
        margin: "auto",
        paddingLeft: "0.625rem",
        paddingRight: "0.625rem",

        [minWidth.tablet]: {
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem"
        }
      }}
    >
      {children}
      <Nav />
    </div>
  </div>
);
