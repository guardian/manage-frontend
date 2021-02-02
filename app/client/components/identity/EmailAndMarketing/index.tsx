import React, { useEffect, useState } from "react";
import { NAV_LINKS } from "../../nav/navConfig";
import { PageContainer } from "../../page";
import { Spinner } from "../../spinner";
import { WithStandardTopMargin } from "../../WithStandardTopMargin";
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

const EmailAndMarketing = (_: { path?: string }) => {
  const { options, error, subscribe, unsubscribe, unsubscribeAll } = Actions;
  const [email, setEmail] = useState<string>("");
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
    <WithStandardTopMargin>
      <GenericErrorMessage ref={errorRef} />
    </WithStandardTopMargin>
  );

  const content = (
    <>
      <WithStandardTopMargin>
        <NewsletterSection
          newsletters={newsletters}
          clickHandler={toggleSubscription}
        />
      </WithStandardTopMargin>
      <WithStandardTopMargin>
        <Lines n={4} />
      </WithStandardTopMargin>
      <WithStandardTopMargin>
        <ConsentSection consents={consents} clickHandler={toggleSubscription} />
      </WithStandardTopMargin>
      <WithStandardTopMargin>
        <Lines n={1} />
      </WithStandardTopMargin>
      <WithStandardTopMargin>
        <EmailSettingsSection
          email={email}
          actionHandler={setRemoveAllEmailConsents}
          removed={removed}
        />
      </WithStandardTopMargin>
      <WithStandardTopMargin>
        <Lines n={4} />
      </WithStandardTopMargin>
      <WithStandardTopMargin>
        <OptOutSection consents={consents} clickHandler={toggleSubscription} />
      </WithStandardTopMargin>
    </>
  );

  const loader = (
    <WithStandardTopMargin>
      <Spinner loadingMessage="Loading your email preferences..." />
    </WithStandardTopMargin>
  );

  return (
    <PageContainer
      selectedNavItem={NAV_LINKS.emailPrefs}
      pageTitle="Emails &amp; marketing"
    >
      {state.error ? errorMessage : null}
      {loading ? (!state.error ? loader : null) : content}
    </PageContainer>
  );
};

export default EmailAndMarketing;
