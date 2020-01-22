import React, { useEffect, useState } from "react";
import { headline } from "../../../styles/fonts";
import { navLinks } from "../../nav";
import {
  PageContainer,
  PageHeaderContainer,
  PageNavAndContentContainer
} from "../../page";
import { Spinner } from "../../spinner";
import {
  GenericErrorMessage,
  GenericErrorMessageRef
} from "../GenericErrorMessage";
import { ConsentOptions, Users } from "../identity";
import { IdentityLocations } from "../IdentityLocations";
import { Lines } from "../Lines";
import { Actions, useConsentOptions } from "../useConsentOptions";
import { ConsentSection } from "./ConsentSection";
import { EmailSettingsSection } from "./EmailSettingsSection";
import { NewsletterSection } from "./NewsletterSection";
import { OptOutSection } from "./OptOutSection";

export const EmailAndMarketing = (props: { path?: string }) => {
  const { options, error, subscribe, unsubscribe, unsubscribeAll } = Actions;
  const [email, setEmail] = useState();
  const [removed, setRemoved] = useState(false);
  const [state, dispatch] = useConsentOptions();

  const toggleSubscription = async (id: string) => {
    const option = ConsentOptions.findById(state.options, id);
    try {
      if (option === undefined) {
        throw Error("Id not found");
      }
      if (option.subscribed) {
        await ConsentOptions.unsubscribe(option);
        dispatch(unsubscribe(id));
      } else {
        await ConsentOptions.subscribe(option);
        dispatch(subscribe(id));
      }
    } catch (e) {
      dispatch(error(e));
    }
  };

  const setRemoveAllEmailConsents = async () => {
    try {
      await ConsentOptions.unsubscribeAll();
      setRemoved(true);
      dispatch(unsubscribeAll());
    } catch (e) {
      dispatch(error(e));
    }
  };

  useEffect(() => {
    const makeInitialAPICalls = async () => {
      try {
        const user = await Users.getCurrentUser();
        if (!user.validated) {
          window.location.assign(IdentityLocations.VERIFY_EMAIL);
          return;
        }
        const consentOptions = await ConsentOptions.getAll();
        setEmail(user.primaryEmailAddress);
        dispatch(options(consentOptions));
      } catch (e) {
        dispatch(error(e));
      }
    };
    makeInitialAPICalls();
  }, []);

  const newsletters = ConsentOptions.newsletters(state.options);
  const consents = ConsentOptions.consents(state.options);
  const loading = newsletters.length === 0 && consents.length === 0;

  const errorRef = React.createRef<GenericErrorMessageRef>();

  useEffect(() => {
    if (state.error && errorRef.current) {
      window.scrollTo(0, errorRef.current.offsetTop - 20);
    }
  }, [state.error]);

  const errorMessage = (
    <PageContainer>
      <GenericErrorMessage ref={errorRef} />
    </PageContainer>
  );

  const content = (
    <>
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
        <ConsentSection consents={consents} clickHandler={toggleSubscription} />
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
        <OptOutSection consents={consents} clickHandler={toggleSubscription} />
      </PageContainer>
    </>
  );

  const loader = (
    <PageContainer>
      <Spinner loadingMessage="Loading your email preferences..." />
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
          Emails &amp; marketing
        </h1>
      </PageHeaderContainer>
      <PageNavAndContentContainer selectedNavItem={navLinks.emailPrefs}>
        {state.error ? errorMessage : null}
        {loading ? (!state.error ? loader : null) : content}
      </PageNavAndContentContainer>
    </>
  );
};
