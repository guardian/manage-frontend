import { css } from "@emotion/react";
import { space } from "@guardian/src-foundations";
import { neutral } from "@guardian/src-foundations/palette";
import { headline } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import { minWidth } from "../../styles/breakpoints";
import { CallCentreEmailAndNumbers } from "../callCenterEmailAndNumbers";
import { isLiveChatFeatureEnabled } from "../liveChat/liveChatFeatureSwitch";
import {
  LiveChatPrivacyNotice,
  LiveChatPrivacyNoticeLink,
} from "../liveChat/liveChatPrivacyNotice";
import { helpCentreConfig } from "./helpCentreConfig";
import {
  EmailAndLiveChatSubHeading,
  HelpCentreEmailAndLiveChat,
} from "./helpCentreEmailAndLiveChat";
import { HelpCentreLandingMoreTopics } from "./helpCentreLandingMoreTopics";
import { HelpCentrePhoneNumbers } from "./helpCentrePhoneNumbers";
import { HelpTopicBox } from "./HelpTopicBox";

const baseSubtitleStyles = css`
  border-top: 1px solid ${neutral["86"]};
  margin-top: 30px;
  ${headline.small({ fontWeight: "bold" })};
`;

const subtitleStyles = css`
  ${baseSubtitleStyles}
  margin-bottom: ${space[6]}px;
  ${minWidth.tablet} {
    margin-bottom: ${space[6]}px;
    margin-top: 40px;
  }
`;

const liveChatSubtitleStyles = css`
  ${baseSubtitleStyles}
  margin-bottom: ${space[1]}px;
  ${minWidth.tablet} {
    margin-bottom: 0;
    margin-top: 40px;
  }
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
          {helpCentreConfig.map((topic) => (
            <HelpTopicBox key={topic.id} topic={topic} />
          ))}
        </div>
        <h2 css={subtitleStyles}>More Topics</h2>
        {/* HelpCentreMoreTopics will replace HelpCentreLandingMoreTopics
        once we convert the landing page to loading dynamic content */}
        <HelpCentreLandingMoreTopics />
        <h2
          css={
            isLiveChatFeatureEnabled() ? liveChatSubtitleStyles : subtitleStyles
          }
        >
          Still can’t find what you’re looking for?
        </h2>
        {isLiveChatFeatureEnabled() ? (
          <>
            <EmailAndLiveChatSubHeading />
            <LiveChatPrivacyNoticeLink />
            <HelpCentreEmailAndLiveChat />
            <HelpCentrePhoneNumbers />
          </>
        ) : (
          <CallCentreEmailAndNumbers />
        )}

        {isLiveChatFeatureEnabled() && <LiveChatPrivacyNotice />}
      </div>
    </>
  );
};

export default HelpCentre;
