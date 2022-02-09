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
 * The description of Opt Out consents have changed so for UX/UI purposes they are now opt INs
 * The backend model remains an opt OUT, so we invert the consented/subscribed value here.
 */
const optOutFinderAndInverter =
  (consents: ConsentOption[], clickHandler: ClickHandler) => (id: string) => {
    const consent = consents.find((c) => c.id === id);
    return (
      consent && (
        <MarketingToggle
          id={consent.id}
          title={consent.name}
          description={consent.description} // Not all consents from IDAPI have a description
          selected={!consent.subscribed} // Opt Out consent value is inverted
          onClick={clickHandler}
        />
      )
    );
  };

const YourDataDescription: FC = () => (
  <>
    What we mean by your data:
    <ul>
      <li>Information you provide e.g. your email address</li>
      <li>Products or services you buy from us</li>
      <li>
        Pages you view on theguardian.com or other Guardian websites when signed
        in
      </li>
    </ul>
  </>
);

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
        {addMarketingToggle("market_research_optout")}
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
