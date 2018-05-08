import React from "react";
import Footer from "./footer";
import Header from "./header";

export const Main: React.SFC<{}> = ({ children }) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "stretch",
        width: "100%"
      }}
    >
      <Header />
      <main css={{ flex: "1" }}>{children}</main>
      <Footer />
    </div>
  );
};
