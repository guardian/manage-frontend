import React, { FC } from "react";
import { WithStandardTopMargin } from "../../WithStandardTopMargin";
import { Lines } from "../Lines";
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

const shouldDisplay = (consents: ConsentOption[]): boolean => !!consents.length;

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

  return shouldDisplay(softOptInEmailConsents(consents)) ? (
    <>
      <WithStandardTopMargin>
        <Lines n={1} />
      </WithStandardTopMargin>
      <WithStandardTopMargin>
        <PageSection title="Supporter exclusive">
          {consentPreferences(softOptInEmailConsents(consents), clickHandler)}
        </PageSection>
      </WithStandardTopMargin>
    </>
  ) : null;
};
