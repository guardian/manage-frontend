import React, { FC } from "react";
import { ConsentOption } from "./models";
import { MarketingPreference } from "./MarketingPreference";
import { PageSection } from "./PageSection";

type ClickHandler = (id: string) => {};

interface ConsentSectionProps {
  clickHandler: ClickHandler;
  consents: ConsentOption[];
}

const getConsentsById = (
  consents: ConsentOption[],
  ids: string[]
): ConsentOption[] => {
  return ids
    .map(id => consents.find(c => c.id === id))
    .filter((x): x is ConsentOption => x !== undefined);
};

const otherEmailConsents = (consents: ConsentOption[]): ConsentOption[] => {
  const ids = ["supporter", "jobs", "holidays", "events", "offers"];
  return getConsentsById(consents, ids);
};

const smsConsent = (consents: ConsentOption[]) =>
  getConsentsById(consents, ["sms"]);

const consentPreference = (
  consent: ConsentOption,
  clickHandler: ClickHandler
) => {
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

const consentPreferences = (
  consents: ConsentOption[],
  clickHandler: ClickHandler
) => consents.map(consent => consentPreference(consent, clickHandler));

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
      {consentPreferences(otherEmailConsents(consents), clickHandler)}
      <h2
        css={{
          fontSize: "17px",
          fontWeight: "bold"
        }}
      >
        Would you also like to hear about the above by SMS?
      </h2>
      {consentPreferences(smsConsent(consents), clickHandler)}
    </PageSection>
  );
};
