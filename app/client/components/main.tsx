import {css} from 'emotion'
import React from "react";
import Footer from "./footer";
import Header from "./header";

export const Main: React.SFC<{}> = ({ children }) => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "stretch",
        width: "100%"
      })}
    >
      <Header />
      <main className={css({ margin: "auto",
                    flex:"1",
                    maxWidth: "48.75rem",
                    paddingBottom: "2.5rem",
                    paddingTop: "0.3125rem" })}>{children}</main>
      <Footer />
    </div>
  );
};
