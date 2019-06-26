import React, { useEffect, useState } from "react";
import { headline } from "../../styles/fonts";
import { navLinks } from "../nav";
import { PageContainer, PageHeaderContainer } from "../page";
import { ConsentSection } from "./ConsentSection";
import { NewsletterSection } from "./NewsletterSection";
import { QuadLine } from "./QuadLine";

import {
  Consent,
  mapConsentGroup,
  NewsletterGroup,
  readConsents,
  readNewsletters,
  updateConsent,
  updateNewsletter
} from "./identity";

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
        <ConsentSection
          consents={mapConsentGroup(consents)}
          clickHandler={updateConsent}
        />
      </PageContainer>
    </>
  );
};
