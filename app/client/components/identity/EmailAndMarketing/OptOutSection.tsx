import React, { FC } from "react";
import { Lines } from "../Lines";
import { MarginWrapper } from "../MarginWrapper";
import { MarketingToggle } from "../MarketingToggle";
import { ConsentOption } from "../models";
import { PageSection } from "../PageSection";

type ClickHandler = (id: string) => {};

interface OptOutSectionProps {
  consents: ConsentOption[];
  clickHandler: ClickHandler;
}

/**
 * NOTE:
 * Only use this method for an OPT OUT consent, eg. "post_optout"
 * The description of Opt On consents have changed so for UX/UI purposes they are now opt INs
 * The backend model remains an opt OUT, so we invert the consented/subscribed value here.
 */
const optOutFinderAndInverter =
  (consents: ConsentOption[], clickHandler: ClickHandler) => (id: string) => {
    const consent = consents.find((c) => c.id === id);
    return (
      consent && (
        <MarketingToggle
          id={consent.id}
          description={consent.description}
          selected={!consent.subscribed} // NOTE: Opt Out consent value is inverted
          onClick={clickHandler}
        />
      )
    );
  };

const standardTextSize = {
  fontSize: "17px",
};

export const OptOutSection: FC<OptOutSectionProps> = (props) => {
  const { consents, clickHandler } = props;
  const addMarketingToggle = optOutFinderAndInverter(consents, clickHandler);
  return (
    <>
      <PageSection
        title="Other ways we may contact you about our products and services"
        description={`
        From time to time, we’d love to be able to update you about our products
        and services via telephone and post.
      `}
      >
        <p css={standardTextSize}>
          Please tick the boxes below to let us know if you{" "}
          <strong>do not wish to receive</strong> information via any of these
          channels:
        </p>
        {addMarketingToggle("post_optout")}
        {addMarketingToggle("phone_optout")}
        <h2 css={[standardTextSize, { fontWeight: "bold" }]}>
          Market Research
        </h2>
        <p css={standardTextSize}>
          From time to time we may contact you for market research purposes
          inviting you to complete a survey, or take part in a group discussion.
          Normally, this invitation would be sent via email, but we may also
          contact you by phone.
        </p>
        {addMarketingToggle("market_research_optout")}
      </PageSection>
      <MarginWrapper>
        <Lines n={1} />
      </MarginWrapper>
      <PageSection title="Using your data for marketing analysis">
        <p css={standardTextSize}>
          From time to time we may use your personal data for marketing
          analysis. That includes looking at what products or services you have
          bought from us and what pages you have been viewing on theguardian.com
          and other Guardian websites (e.g. Guardian Jobs or Guardian Holidays).
          We do this to understand your interests and preferences so that we can
          make our marketing communication more relevant to you.
        </p>
        {addMarketingToggle("profiling_optout")}
      </PageSection>
    </>
  );
};
