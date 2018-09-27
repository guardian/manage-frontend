import React from "react";
import palette from "../colours";
import { serif } from "../styles/fonts";
import Footer from "./footer/footer";
import Header from "./header";

export class Main extends React.PureComponent<{}> {
  public render(): React.ReactNode {
    const children = this.props.children;
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
            flexGrow: "1",
            flexShrink: "0"
          }}
        >
          <main
            css={{
              fontFamily: serif
            }}
          >
            {children}
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}
