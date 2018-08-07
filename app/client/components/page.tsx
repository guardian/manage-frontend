import React from "react";
import palette from "../colours";
import { Nav } from "./nav";

// Standard width, centered container
export const PageContainer: React.SFC<{}> = ({ children }) => {
  return (
    <div
      css={{
        maxWidth: "100%",
        width: "940px",
        margin: "1.8125rem auto 0"
      }}
    >
      {children}
    </div>
  );
};

// Thinner container, for readable text, etc
export const PageContainerSection: React.SFC<{}> = ({ children }) => {
  return (
    <div
      css={{
        maxWidth: "100%",
        width: "45rem",
        margin: "auto"
      }}
    >
      {children}
    </div>
  );
};

export const PageHeaderContainer: React.SFC<{}> = ({ children }) => {
  return (
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
          maxWidth: "100%",
          width: "940px",
          margin: "auto"
        }}
      >
        {children}
        <Nav />
      </div>
    </div>
  );
};
