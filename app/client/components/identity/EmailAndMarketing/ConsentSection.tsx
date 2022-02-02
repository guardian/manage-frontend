import React, { FC } from "react";
import { ConsentOptions } from "../identity";
import { MarketingPreference } from "../MarketingPreference";
import { ConsentOption } from "../models";
import { PageSection } from "../PageSection";
import { WithStandardTopMargin } from "../../WithStandardTopMargin";
import { Lines } from "../Lines";

type ClickHandler = (id: string) => {};

interface ConsentSectionProps {
  clickHandler: ClickHandler;
  consents: ConsentOption[];
}

const supportReminderConsent = (consents: ConsentOption[]): ConsentOption[] =>
  ConsentOptions.findByIds(consents, ["support_reminder"]);

const marketingEmailConsents = (consents: ConsentOption[]): ConsentOption[] => {
  const ids = ["supporter", "jobs", "holidays", "events", "offers"];
  return ConsentOptions.findByIds(consents, ids);
};

const smsConsent = (consents: ConsentOption[]): ConsentOption[] =>
  ConsentOptions.findByIds(consents, ["sms"]);

const softOptInSupporterEmailConsents = (
  consents: ConsentOption[]
): ConsentOption[] => consents.filter((consent) => !!consent.isProduct);

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

export const ConsentSection: FC<ConsentSectionProps> = (props) => {
  const { consents, clickHandler } = props;
  return (
    <>
      <PageSection
        title="What else would you like to hear about by email?"
        description={`
        From time to time, we'd love to be able to send you information about
        our products, services and events.
      `}
      >
        {consentPreferences(supportReminderConsent(consents), clickHandler)}
        {consentPreferences(marketingEmailConsents(consents), clickHandler)}
        <h2
          css={{
            fontSize: "17px",
            fontWeight: "bold",
          }}
        >
          Would you also like to hear about the above by SMS?
        </h2>
        {consentPreferences(smsConsent(consents), clickHandler)}
      </PageSection>
      {shouldDisplay(softOptInSupporterEmailConsents(consents)) && (
        <>
          <WithStandardTopMargin>
            <Lines n={1} />
          </WithStandardTopMargin>
          <WithStandardTopMargin>
            <PageSection title="Supporter exclusive">
              {consentPreferences(
                softOptInSupporterEmailConsents(consents),
                clickHandler
              )}
            </PageSection>
          </WithStandardTopMargin>
        </>
      )}
    </>
  );
};
