import React from "react";
import Header from "./header";
import Footer from "./footer";

export interface MainProps {
    readonly children: ReadonlyArray<JSX.Element> | JSX.Element;
}

export const Main: React.SFC<MainProps> = ({ children }) => {
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
