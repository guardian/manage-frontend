import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  mapSubscriptions,
  Newsletter,
  readConsents,
  readConsentSubscriptions,
  readNewsletters,
  readNewsletterSubscriptions,
  toNewsletterGroups,
  updateConsent,
  updateNewsletter
} from "./identity";

const setSubscription = (
  list: string[],
  setList: Dispatch<SetStateAction<string[]>>,
  updateModel: (id: string, consent: boolean) => {}
) => (id: string) => {
  const location = list.indexOf(id);
  const consent = location >= 0;
  // Eager UI
  if (!consent) {
    setList([...list, id]);
  } else {
    const update = [...list];
    update.splice(location, 1);
    setList(update);
  }
  return updateModel(id, !consent);
};

export const EmailAndMarketing = (props: { path?: string }) => {
  const [newsletters, setNewsletters] = useState([] as Newsletter[]);
  const [consents, setConsents] = useState([] as Consent[]);
  const [subscribed, setSubscribed] = useState([] as string[]);
  const [consented, setConsented] = useState([] as string[]);
  const setNewsletterSubscription = setSubscription(
    subscribed,
    setSubscribed,
    updateNewsletter
  );
  const setUserConsent = setSubscription(
    consented,
    setConsented,
    updateConsent
  );
  useEffect(() => {
    readNewsletterSubscriptions().then(setSubscribed);
    readConsentSubscriptions().then(setConsented);
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
            mapSubscriptions(newsletters, subscribed)
          )}
          clickHandler={setNewsletterSubscription}
        />
      </PageContainer>
      <PageContainer>
        <Lines n={4} />
      </PageContainer>
      <PageContainer>
        <ConsentSection
          consents={mapConsentGroup(mapSubscriptions(consents, consented))}
          clickHandler={setUserConsent}
        />
      </PageContainer>
      <PageContainer>
        <Lines n={4} />
      </PageContainer>
      <PageContainer>
        <OptOutSection
          consents={mapSubscriptions(consents, consented)}
          clickHandler={setUserConsent}
        />
      </PageContainer>
    </>
  );
};
