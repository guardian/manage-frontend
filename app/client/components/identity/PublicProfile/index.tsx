import * as Sentry from "@sentry/browser";
import React, { useEffect, useState } from "react";
import { trackEvent } from "../../analytics";
import { NAV_LINKS } from "../../nav/navConfig";
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
import { IdentityLocations } from "../IdentityLocations";
import { Lines } from "../Lines";
import { User } from "../models";
import { PageSection } from "../PageSection";
import { aCss } from "../sharedStyles";
import { AvatarSection } from "./AvatarSection";
import { ProfileFormSection } from "./ProfileFormSection";

const hasUsername = (user: User) => !!user.username;

export const PublicProfile = (_: { path?: string }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const errorRef = React.createRef<GenericErrorMessageRef>();

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

  useEffect(() => {
    if (error && errorRef.current) {
      window.scrollTo(0, errorRef.current.offsetTop - 20);
    }
  }, [error]);

  const loader = (
    <PageContainer>
      <Spinner loadingMessage="Loading your profile ..." />
    </PageContainer>
  );

  const usernameDisplay = (u: User) => (
    <>
      <PageContainer>
        <PageSection title="Username">{u.username}</PageSection>
      </PageContainer>
      <PageContainer>
        <Lines n={1} />
      </PageContainer>
    </>
  );

  const content = () => (
    <>
      <PageContainer>
        <p css={{ fontSize: "14px" }}>
          These details will be publicly visible to everyone who sees your
          profile in the{" "}
          <a css={aCss} href={IdentityLocations.COMMUNITY_FAQS}>
            commenting
          </a>{" "}
          section.
        </p>
      </PageContainer>
      <PageContainer>
        <Lines n={1} />
      </PageContainer>
      {hasUsername(user) ? usernameDisplay(user) : null}
      <ProfileFormSection
        user={user}
        saveUser={saveUser}
        onError={handleGeneralError}
        onSuccess={setUser}
      />
      <PageContainer>
        <Lines n={1} />
      </PageContainer>
      <PageContainer>
        <AvatarSection userId={user.id} />
      </PageContainer>
    </>
  );

  return (
    <>
      <PageHeaderContainer
        selectedNavItem={NAV_LINKS.profile}
        title="Edit your profile"
      />
      <PageNavAndContentContainer selectedNavItem={NAV_LINKS.profile}>
        <PageContainer>
          {error ? <GenericErrorMessage ref={errorRef} /> : null}
        </PageContainer>
        {loading ? loader : content()}
      </PageNavAndContentContainer>
    </>
  );
};
