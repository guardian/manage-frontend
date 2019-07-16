import React, { useEffect, useState } from "react";
import { headline } from "../../styles/fonts";
import { navLinks } from "../nav";
import { PageContainer, PageHeaderContainer } from "../page";
import { ConsentSection } from "./ConsentSection";
import { EmailSettingsSection } from "./EmailSettingsSection";
import { Lines } from "./Lines";
import { NewsletterSection } from "./NewsletterSection";
import { OptOutSection } from "./OptOutSection";
import { Actions, useConsentOptions } from "./useConsentOptions";

import {
  ConsentOption,
  filterConsents,
  filterNewsletters,
  memoReadUserDetails,
  readConsents,
  readNewsletters,
  readNewsletterSubscriptions,
  updateConsent,
  updateNewsletter,
  updateRemoveAllConsents
} from "./identity";

const [memoReadConsentSubscriptions, memoReadEmail] = memoReadUserDetails();

export const EmailAndMarketing = (props: { path?: string }) => {
  const { options, subscribe, unsubscribe, unsubscribeAll } = Actions;
  const [email, setEmail] = useState();
  const [removed, setRemoved] = useState(false);
  const [state, dispatch] = useConsentOptions();

  const toggleSubscription = (
    updateSubscribable: (id: string, subscribe: boolean) => Promise<any>
  ) => async (id: string) => {
    const subscribed = state.options.find((x: any) => id === x.id).subscribed;
    await updateSubscribable(id, !subscribed);
    subscribed ? dispatch(unsubscribe([id])) : dispatch(subscribe([id]));
  };

  const setRemoveAllEmailConsents = async () => {
    await updateRemoveAllConsents();
    setRemoved(true);
    dispatch(unsubscribeAll());
  };

  const toggleNewsletterSubscription = toggleSubscription(updateNewsletter);
  const toggleConsentSubscription = toggleSubscription(updateConsent);

  const newsletters = filterNewsletters(state.options);
  const consents = filterConsents(state.options);
  const loading = newsletters.length === 0 && consents.length === 0;

  useEffect(() => {
    const dispatchBoth = (responses: [ConsentOption[], string[]]) => {
      dispatch(options(responses[0]));
      dispatch(subscribe(responses[1]));
    };
    Promise.all([readNewsletters(), readNewsletterSubscriptions()]).then(
      dispatchBoth
    );
    Promise.all([readConsents(), memoReadConsentSubscriptions()]).then(
      dispatchBoth
    );
    memoReadEmail().then(primaryEmailAddress => {
      setEmail(primaryEmailAddress);
    });
  }, []);

  const content = (
    <>
      <PageContainer>
        <NewsletterSection
          newsletters={newsletters}
          clickHandler={toggleNewsletterSubscription}
        />
      </PageContainer>
      <PageContainer>
        <Lines n={4} />
      </PageContainer>
      <PageContainer>
        <ConsentSection
          consents={consents}
          clickHandler={toggleConsentSubscription}
        />
      </PageContainer>
      <PageContainer>
        <Lines n={1} />
      </PageContainer>
      <PageContainer>
        <EmailSettingsSection
          email={email}
          actionHandler={setRemoveAllEmailConsents}
          removed={removed}
        />
      </PageContainer>
      <PageContainer>
        <Lines n={4} />
      </PageContainer>
      <PageContainer>
        <OptOutSection
          consents={consents}
          clickHandler={toggleConsentSubscription}
        />
      </PageContainer>
    </>
  );

  const loader = (
    <PageContainer>Loading your subscripton information...</PageContainer>
  );
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
      {loading ? loader : content}
    </>
  );
};
