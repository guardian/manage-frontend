import React, { useEffect, useState } from "react";
import palette from "../../colours";
import { headline } from "../../styles/fonts";
import { MembershipLinks } from "../membershipLinks";
import { navLinks } from "../nav";
import { PageContainer, PageHeaderContainer } from "../page";
import { Spinner } from "../spinner";
import { ConsentSection } from "./ConsentSection";
import { EmailSettingsSection } from "./EmailSettingsSection";
import { Lines } from "./Lines";
import { MarginWrapper } from "./MarginWrapper";
import { NewsletterSection } from "./NewsletterSection";
import { OptOutSection } from "./OptOutSection";
import { Actions, useConsentOptions } from "./useConsentOptions";

import {
  ConsentOptionCollection,
  Consents,
  filterConsents,
  filterNewsletters,
  memoReadEmail,
  Newsletters,
  updateRemoveAllConsents
} from "./identity";

export const EmailAndMarketing = (props: { path?: string }) => {
  const { options, error, subscribe, unsubscribe, unsubscribeAll } = Actions;
  const [email, setEmail] = useState();
  const [removed, setRemoved] = useState(false);
  const [state, dispatch] = useConsentOptions();

  const toggleSubscription = (collection: ConsentOptionCollection) => async (
    id: string
  ) => {
    const subscribed = state.options.find((o: any) => id === o.id).subscribed;
    try {
      if (subscribed) {
        await collection.unsubscribe(id);
        dispatch(unsubscribe(id));
      } else {
        await collection.subscribe(id);
        dispatch(subscribe(id));
      }
    } catch (e) {
      // @TODO: LOGGER
      dispatch(error());
    }
  };

  const setRemoveAllEmailConsents = async () => {
    try {
      await updateRemoveAllConsents();
      setRemoved(true);
      dispatch(unsubscribeAll());
    } catch (e) {
      // @TODO: LOGGER
      dispatch(error());
    }
  };

  useEffect(() => {
    Promise.all([Newsletters.getAll(), Consents.getAll(), memoReadEmail()])
      .then(([ns, cs, e]) => {
        dispatch(options(ns));
        dispatch(options(cs));
        setEmail(e);
      })
      .catch(() => {
        // @TODO: LOGGER
        dispatch(error());
      });
  }, []);

  const toggleNewsletterSubscription = toggleSubscription(Newsletters);
  const toggleConsentSubscription = toggleSubscription(Consents);

  const newsletters = filterNewsletters(state.options);
  const consents = filterConsents(state.options);
  const loading = newsletters.length === 0 && consents.length === 0;

  const errorRef = React.createRef<HTMLDivElement>();

  useEffect(
    () => {
      if (state.error && errorRef.current) {
        window.scrollTo(0, errorRef.current.offsetTop - 20);
      }
    },
    [state.error]
  );

  const errorMessage = (
    <PageContainer>
      <div
        ref={errorRef}
        css={{
          fontSize: "13px",
          lineHeight: "18px",
          backgroundColor: "#ffe1e1",
          borderBottom: `1px solid ${palette.red.light}`,
          borderTop: `1px solid ${palette.red.light}`,
          color: palette.red.medium,
          marginTop: "6px",
          padding: "7px 8px"
        }}
      >
        <p css={{ marginBottom: "10px" }}>Sorry, something went wrong!</p>
        <p css={{ marginBottom: "0" }}>
          <a
            css={{
              color: palette.blue.dark,
              cursor: "pointer"
            }}
            onClick={() => window.location.reload()}
          >
            Refresh this page
          </a>
        </p>
      </div>
    </PageContainer>
  );

  const content = (
    <>
      <PageContainer>
        <NewsletterSection
          newsletters={newsletters}
          clickHandler={toggleNewsletterSubscription}
        />
      </PageContainer>
      <PageContainer>
        <MarginWrapper>
          <Lines n={4} />
        </MarginWrapper>
      </PageContainer>
      <PageContainer>
        <ConsentSection
          consents={consents}
          clickHandler={toggleConsentSubscription}
        />
      </PageContainer>
      <PageContainer>
        <MarginWrapper>
          <Lines n={1} />
        </MarginWrapper>
      </PageContainer>
      <PageContainer>
        <EmailSettingsSection
          email={email}
          actionHandler={setRemoveAllEmailConsents}
          removed={removed}
        />
      </PageContainer>
      <PageContainer>
        <MarginWrapper>
          <Lines n={4} />
        </MarginWrapper>
      </PageContainer>
      <PageContainer>
        <OptOutSection
          consents={consents}
          clickHandler={toggleConsentSubscription}
        />
      </PageContainer>
      <PageContainer>
        <MarginWrapper>
          <MembershipLinks />
        </MarginWrapper>
      </PageContainer>
    </>
  );

  const loader = (
    <PageContainer>
      <Spinner loadingMessage="Loading your subscripton information..." />
    </PageContainer>
  );

  return (
    <>
      <PageHeaderContainer selectedNavItem={navLinks.emailPrefs}>
        <h1
          css={{
            fontSize: "32px",
            lineHeight: "36px",
            fontFamily: headline,
            marginBottom: "30px",
            marginTop: "0"
          }}
        >
          Edit your profile
        </h1>
      </PageHeaderContainer>
      {state.error ? errorMessage : null}
      {loading ? (!state.error ? loader : null) : content}
    </>
  );
};
