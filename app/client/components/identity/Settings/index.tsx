import * as Sentry from "@sentry/browser";
import React, { useEffect, useState } from "react";
import { trackEvent } from "../../analytics";
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
import { Users } from "../identity";
import { User } from "../models";
import { textSmall } from "../sharedStyles";
import { SettingsFormSection } from "./SettingsFormSection";

const errorRef = React.createRef<GenericErrorMessageRef>();
const pageTopRef = React.createRef<HTMLDivElement>();

const loader = (
  <PageContainer>
    <Spinner loadingMessage="Loading your profile ..." />
  </PageContainer>
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
      <PageContainer>
        <span css={textSmall}>
          These details will only be visible to you and the Guardian.
        </span>
      </PageContainer>
      <PageContainer>
        <SettingsFormSection
          user={user}
          saveUser={saveUser}
          onError={handleGeneralError}
          onSuccess={updateValues}
          onDone={scrollToTop}
          emailMessage={emailMessage}
        />
      </PageContainer>
    </>
  );

  return (
    <>
      <PageHeaderContainer
        selectedNavItem={navLinks.settings}
        title="Settings"
      />
      <PageNavAndContentContainer selectedNavItem={navLinks.settings}>
        {!error || (
          <PageContainer>
            <GenericErrorMessage ref={errorRef} />
          </PageContainer>
        )}
        {loading ? loader : content()}
      </PageNavAndContentContainer>
    </>
  );
};
