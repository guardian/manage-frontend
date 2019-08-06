import React, { useEffect, useState } from "react";
import { headline } from "../../../styles/fonts";
import { Button } from "../../buttons";
import { navLinks } from "../../nav";
import { PageContainer, PageHeaderContainer } from "../../page";
import { Spinner } from "../../spinner";
import { Users } from "../identity";
import { IdentityLocations } from "../IdentityLocations";
import { Lines } from "../Lines";
import { PageSection } from "../PageSection";

export const PublicProfile = (props: { path?: string }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    Users.getCurrentUser().then(setUser);
  }, []);

  const loader = (
    <PageContainer>
      <Spinner loadingMessage="Loading your profile ..." />
    </PageContainer>
  );

  const content = () => (
    <>
      <PageContainer>
        These details will be publicly visible to everyone who sees your profile
        in the <a href={IdentityLocations.COMMUNITY_FAQS}>commenting</a>{" "}
        section.
      </PageContainer>
      <PageContainer>
        <Lines n={1} />
      </PageContainer>
      <PageContainer>
        <PageSection title="Profile">
          <label>
            Location
            <input type="text" value={user.location} />
          </label>
          <Button text="Save changes" onClick={() => void 0} />
        </PageSection>
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
      {user ? content() : loader}
    </>
  );
};
