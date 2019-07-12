import React, { FC } from "react";
import { Consent } from "./identity";
import { MarketingPreference } from "./MarketingPreference";
import { PageSection } from "./PageSection";

type ClickHandler = (id: string) => {};

interface ConsentSectionProps {
  clickHandler: ClickHandler;
  consents: Consent[];
  loading: boolean;
}

export const otherEmailConsents = (consents: Consent[]): Consent[] => {
  const ids = ["supporter", "jobs", "holidays", "events", "offers"];
  return ids
    .map(id => consents.find(c => c.id === id))
    .filter((x): x is Consent => x !== undefined);
};

const consentPreference = (consent: Consent, clickHandler: ClickHandler) => {
  const { id, name, description, subscribed } = consent;
  return (
    <MarketingPreference
      id={id}
      key={id}
      title={name}
      description={description}
      selected={subscribed}
      onClick={clickHandler}
    />
  );
};

const consentPreferences = (consents: Consent[], clickHandler: ClickHandler) =>
  consents.map(consent => consentPreference(consent, clickHandler));

export const ConsentSection: FC<ConsentSectionProps> = props => {
  const { consents, clickHandler, loading } = props;
  return (
    <PageSection
      title="What else would you like to hear about by email?"
      description={`
        From time to time, we'd love to be able to send you information about
        our products, services and events.
      `}
    >
      {loading
        ? "Loading ..."
        : consentPreferences(otherEmailConsents(consents), clickHandler)}
    </PageSection>
  );
};
