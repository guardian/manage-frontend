import React, { FC } from "react";
import { Consent } from "./identity";
import { MarketingPreference } from "./MarketingPreference";
import { PageSection } from "./PageSection";

type ClickHandler = (id: string) => {};

interface ConsentSectionProps {
  clickHandler: ClickHandler;
  consents: Consent[];
}

const consentPreference = (consent: Consent, clickHandler: ClickHandler) => {
  const { id, name, description } = consent;
  return (
    <MarketingPreference
      id={id}
      key={id}
      title={name}
      description={description}
      onClick={clickHandler}
    />
  );
};

const consentPreferences = (consents: Consent[], clickHandler: ClickHandler) =>
  consents.map(consent => consentPreference(consent, clickHandler));

export const ConsentSection: FC<ConsentSectionProps> = props => {
  const { consents, clickHandler } = props;
  return (
    <PageSection
      title="What else would you like to hear about by email?"
      description={`
        From time to time, we'd love to be able to send you information about
        our products, services and events.
      `}
    >
      {consentPreferences(consents, clickHandler)}
    </PageSection>
  );
};
