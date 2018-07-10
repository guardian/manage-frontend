import React from "react";
import palette from "../colours";
import Footer from "./footer";
import Header from "./header";

// Standard width, centered container
export const PageContainer: React.SFC<{}> = ({ children }) => {
  return (
    <div
      css={{
        maxWidth: "100%",
        width: "57.5rem",
        margin: "auto"
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
