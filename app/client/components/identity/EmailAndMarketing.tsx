import React, { useEffect, useReducer, useState } from "react";
import { headline } from "../../styles/fonts";
import { navLinks } from "../nav";
import { PageContainer, PageHeaderContainer } from "../page";
import { ConsentSection } from "./ConsentSection";
import { EmailSettingsSection } from "./EmailSettingsSection";
import { Lines } from "./Lines";
import { NewsletterSection } from "./NewsletterSection";
import { OptOutSection } from "./OptOutSection";

import {
  Consent,
  mapSubscriptions,
  memoReadUserDetails,
  readConsents,
  readNewsletters,
  readNewsletterSubscriptions,
  updateConsent,
  updateNewsletter,
  updateRemoveAllConsents
} from "./identity";

const [memoReadConsentSubscriptions, memoReadEmail] = memoReadUserDetails();

enum SubscribableActionTypes {
  FETCH = "FETCH",
  SET = "SET",
  SET_SUBSCRIBED = "SET_SUBSCRIBED",
  SUBSCRIBE = "SUBSCRIBE",
  UNSUBSCRIBE = "UNSUBSCRIBE",
  UNSUBSCRIBE_ALL = "UNSUBSCRIBE_ALL",
  ERROR = "ERROR"
}

interface Action {
  type: string;
  payload?: any;
}

const initialState = {
  error: null,
  loading: true,
  subscribables: [],
  subscriptions: []
};

const subscribableReducer = (state: any, action: Action) => {
  const {
    ERROR,
    FETCH,
    SET,
    SET_SUBSCRIBED,
    SUBSCRIBE,
    UNSUBSCRIBE
  } = SubscribableActionTypes;
  const { payload } = action;
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        error: null,
        loading: true
      };
    case SET_SUBSCRIBED:
      return {
        ...state,
        subscriptions: payload,
        subscribables: mapSubscriptions(state.subscribables, payload)
      };
    case SET:
      return {
        ...state,
        subscribables: payload,
        error: null,
        loading: false
      };
    case SUBSCRIBE: {
      const subscriptions = [...state.subscriptions, payload];
      return {
        ...state,
        subscriptions,
        subscribables: mapSubscriptions(state.subscribables, subscriptions)
      };
    }
    case UNSUBSCRIBE: {
      const subscriptions = state.subscriptions.filter(
        (id: string) => !payload(id)
      );
      return {
        ...state,
        subscriptions,
        subscribables: mapSubscriptions(state.subscribables, subscriptions)
      };
    }
    case ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
  }
};

const useSubscribable = (
  subscribableFetcher: () => Promise<any>,
  subscriptionFetcher: () => Promise<any>,
  updateSubscribable: (id: string, subscribe: boolean) => Promise<any>
) => {
  const [state, dispatch] = useReducer(subscribableReducer, initialState);
  const {
    FETCH,
    SET,
    SET_SUBSCRIBED,
    SUBSCRIBE,
    UNSUBSCRIBE
  } = SubscribableActionTypes;
  const fetchSubscribables = async () => {
    dispatch({ type: FETCH });
    const [subscribables, subscriptions] = await Promise.all([
      subscribableFetcher(),
      subscriptionFetcher()
    ]);
    dispatch({ type: SET, payload: subscribables });
    dispatch({ type: SET_SUBSCRIBED, payload: subscriptions });
  };

  const toggleSubscription = async (id: string) => {
    const subscribed = state.subscriptions.includes(id);
    await updateSubscribable(id, !subscribed);
    subscribed
      ? dispatch({ type: UNSUBSCRIBE, payload: (x: string) => x === id })
      : dispatch({ type: SUBSCRIBE, payload: id });
  };

  const unsubscribe = (predicate: (x: string) => boolean = _ => true) =>
    dispatch({ type: UNSUBSCRIBE, payload: predicate });
  return [state, fetchSubscribables, unsubscribe, toggleSubscription];
};

export const EmailAndMarketing = (props: { path?: string }) => {
  const [email, setEmail] = useState();
  const [removed, setRemoved] = useState(false);
  const [
    newsletterState,
    fetchNewsletters,
    unsubscribeAllNewsletters,
    toggleNewsletterSubscription
  ] = useSubscribable(
    readNewsletters,
    readNewsletterSubscriptions,
    updateNewsletter
  );
  const [
    consentState,
    fetchConsents,
    unsubscribeAllConsents,
    toggleConsentSubscription
  ] = useSubscribable(
    readConsents,
    memoReadConsentSubscriptions,
    updateConsent
  );

  const newsletters = newsletterState.subscribables;
  const consents = consentState.subscribables as Consent[];

  const setRemoveAllEmailConsents = async () => {
    await updateRemoveAllConsents();
    const optouts = consents.filter(consent => consent.isOptOut).map(c => c.id);
    setRemoved(true);
    unsubscribeAllConsents((x: string) => !optouts.includes(x));
    unsubscribeAllNewsletters();
  };

  useEffect(() => {
    memoReadEmail().then(primaryEmailAddress => {
      setEmail(primaryEmailAddress);
    });
    fetchNewsletters();
    fetchConsents();
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
          loading={newsletterState.loading}
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
          loading={consentState.loading}
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
};
