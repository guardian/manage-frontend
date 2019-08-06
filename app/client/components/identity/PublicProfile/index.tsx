import React, { useEffect, useState } from "react";
import { headline } from "../../../styles/fonts";
import { Button } from "../../buttons";
import { navLinks } from "../../nav";
import { PageContainer, PageHeaderContainer } from "../../page";
import { Spinner } from "../../spinner";
import { Users } from "../identity";
import { IdentityLocations } from "../IdentityLocations";
import { Lines } from "../Lines";
import { User } from "../models";
import { PageSection } from "../PageSection";

export const PublicProfile = (props: { path?: string }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Users.getCurrentUser().then(setUser);
  }, []);

  const saveUserLocation = async (u: User) => {
    setLoading(true);
    await Users.save(u);
    setLoading(false);
  };

  const inputHandler = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    setUser({
      ...user,
      [name]: target.value
    });
  };

  const loader = (
    <PageContainer>
      <Spinner loadingMessage="Loading your profile ..." />
    </PageContainer>
  );

  const labelCss = {
    display: "block",
    width: "100%",
    "& input, & textarea": {
      display: "block"
    }
  };

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
          <label css={labelCss}>
            Location
            <input
              name="location"
              type="text"
              value={user.location}
              onChange={inputHandler}
            />
          </label>
          <label css={labelCss}>
            About Me
            <textarea
              name="aboutMe"
              value={user.aboutMe}
              onChange={inputHandler}
            />
          </label>
          <label css={labelCss}>
            Interests
            <textarea
              name="interests"
              value={user.interests}
              onChange={inputHandler}
            />
          </label>
          <Button text="Save changes" onClick={() => saveUserLocation(user)} />
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
