import React from "react";
import Header from "./header";
import Footer from "./footer";

export interface MainProps {
    readonly children: ReadonlyArray<JSX.Element> | JSX.Element;
}

export const Main: React.SFC<MainProps> = ({ children }) => {
    return (
        <div css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: "100%",
            minHeight: "100vh"
        }}>
            <Header />
            <div css={{ flex: "1" }}>
                <main css={{
                    margin: "auto",
                    "max-width": "48.75rem",
                    "padding-bottom": "2.5rem",
                    "padding-top": "0.3125rem"
                }}>
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};
