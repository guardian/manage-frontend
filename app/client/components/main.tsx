import React from "react";
import { css } from "../styles/emotion";
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
      <div
        className={css({
          flex: "1"
        })}
      >
        <main
          className={css({
            margin: "auto",
            maxWidth: "48.75rem",
            paddingBottom: "2.5rem",
            paddingTop: "0.3125rem"
          })}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
