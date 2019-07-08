import React, { useEffect, useState } from "react";
import { headline } from "../../styles/fonts";
import { navLinks } from "../nav";
import { PageContainer, PageHeaderContainer } from "../page";
import { ConsentSection } from "./ConsentSection";
import { Lines } from "./Lines";
import { NewsletterSection } from "./NewsletterSection";
import { OptOutSection } from "./OptOutSection";

import {
  Consent,
  mapConsentGroup,
  mapSubscriptionsToNewsletters,
  Newsletter,
  readConsents,
  readNewsletters,
  readNewsletterSubscriptions,
  toNewsletterGroups,
  updateConsent,
  updateNewsletter
} from "./identity";

export const EmailAndMarketing = (props: { path?: string }) => {
  const [newsletters, setNewsletters] = useState([] as Newsletter[]);
  const [consents, setConsents] = useState([] as Consent[]);
  const [subscribed, setSubscribed] = useState([] as string[]);
  const setNewsletterConsent = (id: string) => {
    const location = subscribed.indexOf(id);
    const consented = location >= 0;
    // Eager UI
    if (!consented) {
      setSubscribed([...subscribed, id]);
    } else {
      const update = [...subscribed];
      update.splice(location, 1);
      setSubscribed(update);
    }
    return updateNewsletter(id, !consented);
  };
  useEffect(() => {
    readNewsletterSubscriptions().then(setSubscribed);
    readNewsletters().then(setNewsletters);
    readConsents().then(setConsents);
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
          newsletterGroups={toNewsletterGroups(
            mapSubscriptionsToNewsletters(newsletters, subscribed)
          )}
          clickHandler={setNewsletterConsent}
        />
      </PageContainer>
      <PageContainer>
        <Lines n={4} />
      </PageContainer>
      <PageContainer>
        <ConsentSection
          consents={mapConsentGroup(consents)}
          clickHandler={updateConsent}
        />
      </PageContainer>
      <PageContainer>
        <Lines n={4} />
      </PageContainer>
      <PageContainer>
        <OptOutSection consents={consents} clickHandler={updateConsent} />
      </PageContainer>
    </>
  );
};
