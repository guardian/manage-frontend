import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState
} from "react";
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
  readConsents,
  readNewsletters,
  readNewsletterSubscriptions,
  readUserDetails,
  updateConsent,
  updateNewsletter,
  updateRemoveAllConsents
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
  loading: false,
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
    UNSUBSCRIBE,
    UNSUBSCRIBE_ALL
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
      const location = state.subscriptions.indexOf(payload);
      const subscriptions = [
        ...state.subscriptions.slice(0, location),
        ...state.subscriptions.slice(location + 1)
      ];
      return {
        ...state,
        subscriptions,
        subscribables: mapSubscriptions(state.subscribables, subscriptions)
      };
    }
    case UNSUBSCRIBE_ALL:
      return {
        ...state,
        subscriptions: [],
        subscribables: mapSubscriptions(state.subscribables, [])
      };
    case ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
  }
};

const useNewsletters = () => {
  const [state, dispatch] = useReducer(subscribableReducer, initialState);
  const {
    FETCH,
    SET,
    SET_SUBSCRIBED,
    SUBSCRIBE,
    UNSUBSCRIBE,
    UNSUBSCRIBE_ALL
  } = SubscribableActionTypes;
  const fetchNewsletters = async () => {
    dispatch({ type: FETCH });
    const [newsletters, subscriptions] = await Promise.all([
      readNewsletters(),
      readNewsletterSubscriptions()
    ]);
    dispatch({ type: SET, payload: newsletters });
    dispatch({ type: SET_SUBSCRIBED, payload: subscriptions });
  };

  const toggleSubscription = async (id: string) => {
    const subscribed = state.subscriptions.includes(id);
    await updateNewsletter(id, !subscribed);
    subscribed
      ? dispatch({ type: UNSUBSCRIBE, payload: id })
      : dispatch({ type: SUBSCRIBE, payload: id });
  };

  const unsubscribeAll = () => dispatch({ type: UNSUBSCRIBE_ALL });

  return [state, fetchNewsletters, unsubscribeAll, toggleSubscription];
};

export const EmailAndMarketing = (props: { path?: string }) => {
  const [consents, setConsents] = useState([] as Consent[]);
  const [consented, setConsented] = useState([] as string[]);
  const [email, setEmail] = useState();
  const [removed, setRemoved] = useState(false);

  const [
    newsletterState,
    fetchNewsletters,
    unsubscribeAll,
    toggleSubscription
  ] = useNewsletters();
  const newsletters = newsletterState.subscribables;

  const setRemoveAllEmailConsents = async () => {
    await updateRemoveAllConsents();
    const optouts = consents.filter(consent => consent.isOptOut).map(c => c.id);
    setRemoved(true);
    setConsented(consented.filter(id => optouts.includes(id)));
    unsubscribeAll();
  };
  const setUserConsent = setSubscription(
    consented,
    setConsented,
    updateConsent
  );
  useEffect(() => {
    readUserDetails().then(user => {
      setConsented(user.consents);
      setEmail(user.email);
    });
    fetchNewsletters();
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
          newsletters={newsletters}
          clickHandler={toggleSubscription}
        />
      </PageContainer>
      <PageContainer>
        <Lines n={4} />
      </PageContainer>
      <PageContainer>
        <ConsentSection
          consents={mapSubscriptions(consents, consented)}
          clickHandler={setUserConsent}
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
          consents={mapSubscriptions(consents, consented)}
          clickHandler={setUserConsent}
        />
      </PageContainer>
    </>
  );
};
