import React from "react";
import { initGA } from "../analytics";
import palette from "../colours";
import { serif } from "../styles/fonts";
import Footer from "./footer/footer";
import Header from "./header";

export class Main extends React.PureComponent<{}> {
  public componentDidMount(): void {
    initGA();
  }

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
            flex: "1"
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
