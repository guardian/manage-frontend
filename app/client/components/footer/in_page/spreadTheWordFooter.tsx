import React from "react";
import palette from "../../../colours";
import { trackEvent } from "../../analytics";
import { InPageFooter } from "./inPageFooter";

export const SpreadTheWordFooter = () => (
  <InPageFooter title="Spread the word">
    We report for everyone. Let your friends and followers know that you support
    independent journalism.
    <div
      css={{
        svg: {
          margin: "10px",
          backgroundColor: palette.neutral["2"],
          borderRadius: "20px",
          fill: palette.white,
          ":hover": {
            backgroundColor: palette.neutral["1"]
          }
        }
      }}
    >
      <a
        href={"" /* TODO add Facebook share URL*/}
        onClick={() =>
          trackEvent({
            eventCategory: "payment",
            eventAction: "shared",
            eventLabel: "facebook"
          })
        }
      >
        <svg width="40" height="40" viewBox="-2 -2 32 32">
          <path d="M17.9 14h-3v8H12v-8h-2v-2.9h2V8.7C12 6.8 13.1 5 16 5c1.2 0 2 .1 2 .1v3h-1.8c-1 0-1.2.5-1.2 1.3v1.8h3l-.1 2.8z" />
        </svg>
      </a>
      <a
        href={"" /* TODO add Twitter share URL*/}
        onClick={() =>
          trackEvent({
            eventCategory: "payment",
            eventAction: "shared",
            eventLabel: "twitter"
          })
        }
      >
        <svg width="40" height="40" viewBox="-2 -2 32 32">
          <path d="M21.3 10.5v.5c0 4.7-3.5 10.1-9.9 10.1-2 0-3.8-.6-5.3-1.6.3 0 .6.1.8.1 1.6 0 3.1-.6 4.3-1.5-1.5 0-2.8-1-3.3-2.4.2 0 .4.1.7.1l.9-.1c-1.6-.3-2.8-1.8-2.8-3.5.5.3 1 .4 1.6.4-.9-.6-1.6-1.7-1.6-2.9 0-.6.2-1.3.5-1.8 1.7 2.1 4.3 3.6 7.2 3.7-.1-.3-.1-.5-.1-.8 0-2 1.6-3.5 3.5-3.5 1 0 1.9.4 2.5 1.1.8-.1 1.5-.4 2.2-.8-.3.8-.8 1.5-1.5 1.9.7-.1 1.4-.3 2-.5-.4.4-1 1-1.7 1.5z" />
        </svg>
      </a>
    </div>
  </InPageFooter>
);
