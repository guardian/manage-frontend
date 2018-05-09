import React from "react";
import palette from "../colours";

const Footer = () => (
    <footer>
        <div css={{
            backgroundColor: palette.neutral.header,
            color: palette.neutral["1"],
            height: "42px",
            "text-align": "right"
        }}>
            <div css={{
                "max-width": "71.25rem",
                margin: "auto",
                "line-height": "42px",
                "padding-right": "2rem"
            }}>
                <a href={"#top"} css={{color: palette.neutral["1"]}}>
                    back to top
                </a>
            </div>
        </div>
        <div>
            <div css={{
                backgroundColor: "#333",
                color: "#bdbdbd",
                "padding": "0.25rem",
                "font-size": "0.75rem"
            }}>
                <div css={{
                    "max-width": "71.25rem",
                    margin: "auto"
                }}>
                    © 2018 Guardian News and Media Limited or its affiliated companies. All&nbsp;rights&nbsp;reserved.
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
