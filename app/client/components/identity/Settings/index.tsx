import * as Sentry from "@sentry/browser";
import React, { useEffect, useState } from "react";
import { trackEvent } from "../../analytics";
import { NAV_LINKS } from "../../nav/navConfig";
import { PageContainer, WithStandardTopMargin } from "../../page";
import { Spinner } from "../../spinner";
import {
  GenericErrorMessage,
  GenericErrorMessageRef
} from "../GenericErrorMessage";
import { Users } from "../identity";
import { User } from "../models";
import { textSmall } from "../sharedStyles";
import { SettingsFormSection } from "./SettingsFormSection";

const errorRef = React.createRef<GenericErrorMessageRef>();
const pageTopRef = React.createRef<HTMLDivElement>();

const loader = (
  <WithStandardTopMargin>
    <Spinner loadingMessage="Loading your profile ..." />
  </WithStandardTopMargin>
);

export const Settings = (_: { path?: string }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [emailMessage, setEmailMessage] = useState();

  useEffect(() => {
    if (error && errorRef.current) {
      window.scrollTo(0, errorRef.current.offsetTop - 20);
    }
  }, [error]);

  const handleGeneralError = (e: any) => {
    setError(true);
    Sentry.captureException(e);
    trackEvent({
      eventCategory: "publicProfileError",
      eventAction: "error",
      eventLabel: e.toString()
    });
  };

  useEffect(() => {
    Users.getCurrentUser()
      .then((u: User) => {
        setUser(u);
      })
      .then(() => setLoading(false))
      .catch(handleGeneralError);
  }, []);

  const saveUser = async (values: User) => {
    const changedUser = { ...user, ...values };
    return await Users.saveChanges(user, changedUser);
  };

  const scrollToTop = () => {
    if (pageTopRef.current) {
      window.scrollTo(0, pageTopRef.current.offsetTop - 20);
    }
  };

  const updateValues = (input: User, response: User) => {
    const changedFields = Users.getChangedFields(response, input);
    if (changedFields.primaryEmailAddress) {
      setEmailMessage(changedFields.primaryEmailAddress);
    }
    setUser(response);
  };

  const content = () => (
    <>
      <div ref={pageTopRef} css={{ display: "none" }} />
      <WithStandardTopMargin>
        <span css={textSmall}>
          These details will only be visible to you and the Guardian.
        </span>
      </WithStandardTopMargin>
      <WithStandardTopMargin>
        <SettingsFormSection
          user={user}
          saveUser={saveUser}
          onError={handleGeneralError}
          onSuccess={updateValues}
          onDone={scrollToTop}
          emailMessage={emailMessage}
        />
      </WithStandardTopMargin>
    </>
  );

  return (
    <PageContainer selectedNavItem={NAV_LINKS.settings} pageTitle="Settings">
      {!error || (
        <WithStandardTopMargin>
          <GenericErrorMessage ref={errorRef} />
        </WithStandardTopMargin>
      )}
      {loading ? loader : content()}
    </PageContainer>
  );
};
