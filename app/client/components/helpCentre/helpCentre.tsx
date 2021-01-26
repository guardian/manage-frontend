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
import { SectionHeader } from "../sectionHeader";
import { SectionPageContainer } from "../sectionPageContainer";
import { helpCentreConfig } from "./helpCentreConfig";
import { HelpTopicBox } from "./HelpTopicBox";
import { KnownIssues } from "./knownIssues";

interface HelpCentreProps extends RouteComponentProps {
  urlSuccess?: string;
}

const titleStyle = css`
  ${headline.xsmall({ fontWeight: "bold" })};
  margin: 0;
  border-top: 1px solid ${neutral[86]};
  ${minWidth.desktop} {
    font-size: 1.75rem;
    border-top: 0;
  }
`;

const popularTopicsTitleStyle = css`
  ${headline.xxsmall({ fontWeight: "bold" })};
  border-top: 1px solid ${neutral[86]};
  margin-top: ${space[6]}px;
  padding: ${space[1]}px 0;
  ${minWidth.desktop} {
    margin-top: ${space[9]}px;
  }
`;

const contactUsTitleStyle = css`
  border-top: 1px solid ${neutral["86"]};
  margin-top: 30px;
  ${minWidth.tablet} {
    margin-top: 40px;
  }
  ${headline.small({ fontWeight: "bold" })};
`;

const HelpCentre = (_: HelpCentreProps) => (
  <>
    <SectionHeader title="Help Centre" />
    <KnownIssues />
    <SectionPageContainer sectionTitle="Help Centre">
      <div
        css={css`
          margin-bottom: ${space[24]}px;
        `}
      >
        <h1 css={titleStyle}>How can we help you?</h1>
        <h2 css={popularTopicsTitleStyle}>Most popular topics</h2>
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
        <h2 css={contactUsTitleStyle}>
          Still can’t find what you’re looking for?
        </h2>
        <CallCentreEmailAndNumbers />
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
          to="/contact-us/"
          onClick={() =>
            trackEvent({
              eventCategory: "help-centre",
              eventAction: "contact-us-cta-click"
            })
          }
        />
      </div>{" "}
    </SectionPageContainer>
  </>
);

export default HelpCentre;
