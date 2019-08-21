import React, { useEffect, useState } from "react";
import { headline } from "../../../styles/fonts";
import { navLinks } from "../../nav";
import { PageContainer, PageHeaderContainer } from "../../page";
import { Spinner } from "../../spinner";
import { Users } from "../identity";
import { IdentityLocations } from "../IdentityLocations";
import { Lines } from "../Lines";
import { User } from "../models";
import { PageSection } from "../PageSection";
import { aCss } from "../sharedStyles";
import { AvatarSection } from "./AvatarSection";
import { ProfileFormSection } from "./ProfileFormSection";

const hasUsername = (user: User) => !!user.username;

export const PublicProfile = (props: { path?: string }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Users.getCurrentUser()
      .then((u: User) => {
        setUser(u);
      })
      .then(() => setLoading(false));
  }, []);

  const saveUser = async (values: User) => {
    setLoading(true);
    const changedUser = { ...user, ...values };
    await Users.saveChanges(user, changedUser);
    setUser(changedUser);
    setLoading(false);
  };

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
      <ProfileFormSection user={user} saveUser={saveUser} />
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
      <PageHeaderContainer selectedNavItem={navLinks.publicProfile}>
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
      {loading ? loader : content()}
    </>
  );
};
