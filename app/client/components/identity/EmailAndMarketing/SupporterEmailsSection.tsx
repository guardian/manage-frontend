import React, { FC } from "react";
import { MarketingPreference } from "../MarketingPreference";
import { ConsentOption } from "../models";
import { PageSection } from "../PageSection";

type ClickHandler = (id: string) => {};

interface ConsentSectionProps {
  clickHandler: ClickHandler;
  consents: ConsentOption[];
}

const softOptInEmailConsents = (consents: ConsentOption[]): ConsentOption[] =>
  consents.filter((consent) => !!consent.isProduct);

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
) => consents.map((consent) => consentPreference(consent, clickHandler));

export const SupporterEmailsSection: FC<ConsentSectionProps> = (props) => {
  const { consents, clickHandler } = props;
  return (
    <PageSection title="Supporter exclusive">
      {consentPreferences(softOptInEmailConsents(consents), clickHandler)}
    </PageSection>
  );
};
