import React, { FC } from "react";
import { minWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import { Consent } from "./identity";
import { MarketingPreference } from "./MarketingPreference";

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
    <div
      css={{
        [minWidth.desktop]: {
          display: "flex"
        }
      }}
    >
      <div
        css={{
          [minWidth.desktop]: {
            paddingRight: "6.25rem",
            width: "26.25rem"
          }
        }}
      >
        <h2
          css={{
            fontSize: "1.0625rem",
            lineHeight: "1.5rem",
            fontWeight: "bold",
            margin: "0"
          }}
        >
          What else would you like to hear about by email?
        </h2>
        <p
          css={{
            fontFamily: sans,
            fontSize: "0.875rem",
            marginBottom: "0.5rem"
          }}
        >
          From time to time, we'd love to be able to send you information about
          our products, services and events.
        </p>
      </div>
      <div
        css={{
          width: "100%"
        }}
      >
        {consentPreferences(consents, clickHandler)}
      </div>
    </div>
  );
};
