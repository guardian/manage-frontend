import React, { useEffect, useState } from "react";
import { headline } from "../../styles/fonts";
import { navLinks } from "../nav";
import { PageContainer, PageHeaderContainer } from "../page";
import { MarketingPreference } from "./MarketingPreference";
import { NewsletterSection } from "./NewsletterSection";
import { QuadLine } from "./QuadLine";

import {
  Consent,
  NewsletterGroup,
  readConsents,
  readNewsletters,
  updateConsent,
  updateNewsletter
} from "./identity";

const consentPreference = (consent: Consent) => {
  const { id, name, description } = consent;
  return (
    <MarketingPreference
      id={id}
      key={id}
      title={name}
      description={description}
      onClick={updateConsent}
    />
  );
};

export const EmailAndMarketing = (props: { path?: string }) => {
  const [newsletterGroups, setNewsletterGroups] = useState(
    [] as NewsletterGroup[]
  );
  const [consents, setConsents] = useState([] as Consent[]);
  useEffect(() => {
    readNewsletters().then(ns => setNewsletterGroups(ns));
    readConsents().then(cs => setConsents(cs));
  }, []);

  return (
    <>
      <PageHeaderContainer selectedNavItem={navLinks.emailPrefs}>
        <h1
          css={{
            fontSize: "2rem",
            lineHeight: "2.25rem",
            fontFamily: headline,
            marginBottom: "30px",
            marginTop: "0"
          }}
        >
          Edit your profile
        </h1>
      </PageHeaderContainer>
      <PageContainer>
        <NewsletterSection
          newsletterGroups={newsletterGroups}
          clickHandler={updateNewsletter}
        />
      </PageContainer>
      <PageContainer>
        <QuadLine />
      </PageContainer>
      <PageContainer>
        <h2>Consents</h2>
        {consents.map(consentPreference)}
      </PageContainer>
    </>
  );
};
