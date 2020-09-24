import React from "react";
import palette from "../colours";
import { serif } from "../styles/fonts";
import { Footer } from "./footer/footer";
import Header from "./header";

export interface WithOptionalServerPathWithQueryParams {
  serverPathWithQueryParams?: string;
}

interface MainProps extends WithOptionalServerPathWithQueryParams {
  children: any;
}

export const Main = ({ children }: MainProps) => {
  const tmpIsSignedIn =
    typeof window !== "undefined" && !!window.guardian?.identityDetails?.userId;
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "stretch",
        width: "100%",
        color: palette.neutral["2"],
      }}
    >
      <Header isSignedOut={!tmpIsSignedIn} />
      <div
        css={{
          flexGrow: 1,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main
          css={{
            fontFamily: serif,
            flexGrow: 1,
            flexShrink: 0,
          }}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
