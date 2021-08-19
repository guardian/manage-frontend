import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { brand, neutral } from "@guardian/src-foundations/palette";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { minWidth } from "../../styles/breakpoints";
import { trackEvent } from "../analytics";
import { LinkButton } from "../buttons";
import { CallCentreEmailAndNumbers } from "../callCenterEmailAndNumbers";
import { isLiveChatFeatureEnabled } from "../liveChat/liveChatFeatureSwitch";
import { helpCentreConfig } from "./helpCentreConfig";
import { HelpCentreEmailAndLiveChat } from "./helpCentreEmailAndLiveChat";
import { HelpCentreLandingMoreTopics } from "./helpCentreLandingMoreTopics";
import { HelpCentrePhoneNumbers } from "./helpCentrePhoneNumbers";
import { HelpTopicBox } from "./HelpTopicBox";

const subtitleStyles = css`
  border-top: 1px solid ${neutral["86"]};
  margin-top: 30px;
  ${minWidth.tablet} {
    margin-top: 40px;
  }
  ${headline.small({ fontWeight: "bold" })};
`;

const HelpCentre = (_: RouteComponentProps) => {
  return (
    <>
      <div
        css={css`
          margin-bottom: ${space[24]}px;
        `}
      >
        <h2 css={subtitleStyles}>Most popular topics</h2>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            align-items: stretch;
            justify-content: space-between;
          `}
        >
          {helpCentreConfig.map(topic => (
            <HelpTopicBox key={topic.id} topic={topic} />
          ))}
        </div>
        <h2 css={subtitleStyles}>More Topics</h2>
        {/* HelpCentreMoreTopics will replace HelpCentreLandingMoreTopics
        once we convert the landing page to loading dynamic content */}
        <HelpCentreLandingMoreTopics />
        <h2 css={subtitleStyles}>Still can’t find what you’re looking for?</h2>
        {isLiveChatFeatureEnabled() ? (
          <>
            <HelpCentreEmailAndLiveChat />
            <HelpCentrePhoneNumbers />
          </>
        ) : (
          <CallCentreEmailAndNumbers />
        )}
        <p
          css={css`
            ${textSans.medium()};
            margin-top: ${space[5]}px;
          `}
        >
          Or use our contact form to get in touch and we’ll get back to you as
          soon as possible.
        </p>
        <LinkButton
          colour={brand[800]}
          textColour={brand[400]}
          fontWeight={"bold"}
          text="Take me to the form"
          to="/help-centre/contact-us/"
          onClick={() =>
            trackEvent({
              eventCategory: "help-centre",
              eventAction: "contact-us-cta-click"
            })
          }
        />
      </div>
    </>
  );
};

export default HelpCentre;
