import { css } from "@emotion/core";
import React from "react";
import palette from "../../../colours";
import { minWidth } from "../../../styles/breakpoints";
import { trackEvent } from "../../analytics";
import { GoogleOptimiseAwaitFlagWrapper } from "../../GoogleOptimiseAwaitFlagWrapper";
import { PageContainerSection } from "../../page";

const cssBullet = (flexBasis: string = "50%") =>
  css({
    flexBasis,
    flexGrow: 1,
    listStyle: "none",
    listStylePosition: "inside",
    textIndent: "-0.6em",
    paddingLeft: "20px",
    "&::before": {
      display: "inline-block",
      content: "'●'",
      marginRight: "0.6em"
    }
  });

const benefitsCss = css({
  margin: 0,
  padding: 0,

  [minWidth.tablet]: {
    display: "flex",
    flexWrap: "wrap"
  }
});

const clickHereToFindOutMoreAboutOurNewFeatures = (
  <a
    css={{
      textDecoration: "underline",
      color: palette.blue.dark,
      ":visited": { color: palette.blue.dark }
    }}
    href="https://www.theguardian.com/help/insideguardian/2018/may/15/introducing-live-and-discover-to-the-premium-tier-of-the-guardian-app"
    onClick={() => {
      trackEvent({
        eventCategory: "href",
        eventAction: "premium_features"
      });
    }}
  >
    click here to find out about our brand new features
  </a>
);

export const membershipCancellationFlowStart = (
  <>
    <div
      css={{
        backgroundColor: palette.neutral["6"],
        padding: "10px 20px",
        marginBottom: "40px"
      }}
    >
      <h4
        css={{
          textAlign: "center",
          marginTop: "0",
          marginBottom: "10px"
        }}
      >
        If you cancel your Membership you will miss out on:
      </h4>
      <GoogleOptimiseAwaitFlagWrapper experimentFlagName="alternateMembershipBenefits">
        {{
          flagIsSet: (
            <ul css={benefitsCss}>
              <li css={cssBullet("100%")}>
                Exclusive emails from our membership editor
              </li>
              <li
                css={{
                  ...cssBullet("100%"),
                  paddingTop: "5px"
                }}
              >
                Free access to the ad-free premium tier of the Guardian app, now
                featuring ‘Live’ & ‘Discover’ - two new ways to experience the
                Guardian, set to the pace of your day.
                <ul>
                  <li css={{ display: "list-item" }}>
                    Live: Access to every breaking news story and update, in
                    real time
                  </li>
                  <li>
                    Discover: Explore great stories you may have missed, when
                    you have more time
                  </li>
                </ul>
              </li>
              <div
                css={{
                  textAlign: "center",
                  width: "100%",
                  margin: "10px"
                }}
              >
                {clickHereToFindOutMoreAboutOurNewFeatures}
              </div>
            </ul>
          ),
          flagIsNotSet: (
            <ul css={benefitsCss}>
              <li css={cssBullet()}>Access to events tickets</li>
              <li css={cssBullet()}>
                Exclusive emails from our membership editor
              </li>
              <li
                css={{
                  ...cssBullet("100%"),
                  paddingTop: "5px"
                }}
              >
                Free access to the premium tier of the Guardian app -{" "}
                {clickHereToFindOutMoreAboutOurNewFeatures}
              </li>
            </ul>
          )
        }}
      </GoogleOptimiseAwaitFlagWrapper>
    </div>
    <PageContainerSection>
      <p
        css={{
          fontSize: "1rem",
          fontWeight: 500
        }}
      >
        Your support means we can remain independent, open to all readers and
        empowered to hold those in power to account.
      </p>

      <p>
        Sorry to hear you are thinking of cancelling your membership.
        <br />
        Can you take a moment to tell us why?
      </p>
    </PageContainerSection>
  </>
);
