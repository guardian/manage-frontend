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
    <WithStandardTopMargin>
      <Spinner loadingMessage="Loading your profile ..." />
    </WithStandardTopMargin>
  );

  const usernameDisplay = (u: User) => (
    <>
      <WithStandardTopMargin>
        <PageSection title="Username">{u.username}</PageSection>
      </WithStandardTopMargin>
      <WithStandardTopMargin>
        <Lines n={1} />
      </WithStandardTopMargin>
    </>
  );

  const content = () => (
    <>
      <WithStandardTopMargin>
        <p css={{ fontSize: "14px" }}>
          These details will be publicly visible to everyone who sees your
          profile in the{" "}
          <a css={aCss} href={IdentityLocations.COMMUNITY_FAQS}>
            commenting
          </a>{" "}
          section.
        </p>
      </WithStandardTopMargin>
      <WithStandardTopMargin>
        <Lines n={1} />
      </WithStandardTopMargin>
      {hasUsername(user) ? usernameDisplay(user) : null}
      <ProfileFormSection
        user={user}
        saveUser={saveUser}
        onError={handleGeneralError}
        onSuccess={setUser}
      />
      <WithStandardTopMargin>
        <Lines n={1} />
      </WithStandardTopMargin>
      <WithStandardTopMargin>
        <AvatarSection userId={user.id} />
      </WithStandardTopMargin>
    </>
  );

  return (
    <PageContainer
      selectedNavItem={NAV_LINKS.profile}
      pageTitle="Edit your profile"
    >
      <WithStandardTopMargin>
        {error ? <GenericErrorMessage ref={errorRef} /> : null}
      </WithStandardTopMargin>
      {loading ? loader : content()}
    </PageContainer>
  );
};
