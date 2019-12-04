import Raven from "raven-js";
import React, { useEffect, useState } from "react";
import { headline } from "../../../styles/fonts";
import { trackEvent } from "../../analytics";
import { MembershipLinks } from "../../membershipLinks";
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
import { AccountDetailsFormSection } from "./AccountFormSection";

const errorRef = React.createRef<GenericErrorMessageRef>();
const pageTopRef = React.createRef<HTMLDivElement>();

const loader = (
  <PageContainer>
    <Spinner loadingMessage="Loading your profile ..." />
  </PageContainer>
);

export const AccountDetails = (props: { path?: string }) => {
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
    Raven.captureException(e);
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
        <AccountDetailsFormSection
          user={user}
          saveUser={saveUser}
          onError={handleGeneralError}
          onSuccess={updateValues}
          onDone={scrollToTop}
          emailMessage={emailMessage}
        />
      </PageContainer>
      <PageContainer>
        <MembershipLinks />
      </PageContainer>
    </>
  );

  return (
    <>
      <PageHeaderContainer selectedNavItem={navLinks.accountDetails}>
        <h1
          css={{
            fontSize: "32px",
            lineHeight: "36px",
            fontFamily: headline,
            marginBottom: "30px",
            marginTop: "0"
          }}
        >
          Account details
        </h1>
      </PageHeaderContainer>
      <PageNavAndContentContainer selectedNavItem={navLinks.accountDetails}>
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
