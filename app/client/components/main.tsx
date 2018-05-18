import React from "react";
import palette from "../colours";
import { css } from "../styles/emotion";
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
        width: "100%",
        color: palette.neutral["2"]
      }}
    >
      <Header />
      <div
        css={{
          flex: "1"
        }}
      >
        <main
          css={{
            margin: "auto",
            maxWidth: "48.75rem",
            paddingBottom: "2.5rem",
            paddingTop: "30px",
            fontFamily: '"Guardian Text Egyptian Web",Georgia,serif'  
          }}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
