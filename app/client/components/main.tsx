import React from "react";
import palette from "../colours";
import { serif } from "../styles/fonts";
import { Footer } from "./footer/footer";
import Header from "./header";
import { pathsToAllowThroughWithoutSignin } from "../../shared/pathsToAllowThroughWithoutSignin";

export interface WithOptionalServerPathWithQueryParams {
  serverPathWithQueryParams?: string;
}

interface MainProps extends WithOptionalServerPathWithQueryParams {
  children: any;
}

export const Main = ({ children, serverPathWithQueryParams }: MainProps) => {
  const pathWithoutQueryParams =
    serverPathWithQueryParams?.split(/[?#]/)[0] || window.location.pathname;
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "stretch",
        width: "100%",
        color: palette.neutral["2"]
      }}
    >
      {pathsToAllowThroughWithoutSignin.includes(pathWithoutQueryParams) ? (
        <span>Not signed in header</span>
      ) : (
        <Header />
      )}
      <div
        css={{
          flexGrow: 1,
          flexShrink: 0
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
};
