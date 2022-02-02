import React, { FC } from "react";
import { Lines } from "../Lines";
import { WithStandardTopMargin } from "../../WithStandardTopMargin";
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
  (consents: ConsentOption[], clickHandler: ClickHandler) =>
  (id: string, altDescription?: string) => {
    const consent = consents.find((c) => c.id === id);
    return (
      consent && (
        <MarketingToggle
          id={consent.id}
          title={consent.name}
          description={consent.description || altDescription} // Not all consents from IDAPI have a description
          selected={!consent.subscribed} // Opt Out consent value is inverted
          onClick={clickHandler}
        />
      )
    );
  };

const YourDataDescription: FC = () => (
  <>
    By “Your data” we mean:
    <ul>
      <li>Information you provide such as your email address</li>
      <li>Products or services you buy from us</li>
      <li>
        Pages you view on theguardian.com or other Guardian websites when signed
        in
      </li>
    </ul>
  </>
);

const marketResearchAltDescription: string =
  "From time to time we may contact you for market research purposes inviting you to complete a survey, or take part in a group discussion. Normally, this invitation would be sent via email, but we may also contact you by phone.";

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
        {addMarketingToggle("post_optout")}
        {addMarketingToggle("phone_optout")}
        {addMarketingToggle(
          "market_research_optout",
          marketResearchAltDescription
        )}
      </PageSection>
      <WithStandardTopMargin>
        <Lines n={1} />
      </WithStandardTopMargin>
      <WithStandardTopMargin>
        <PageSection title="Your data" description={<YourDataDescription />}>
          {addMarketingToggle("profiling_optout")}
        </PageSection>
      </WithStandardTopMargin>
    </>
  );
};
