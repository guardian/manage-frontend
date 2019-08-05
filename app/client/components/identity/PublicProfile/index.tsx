import React from "react";
import { headline } from "../../../styles/fonts";
import { navLinks } from "../../nav";
import { PageContainer, PageHeaderContainer } from "../../page";
import { IdentityLocations } from "../IdentityLocations";
import { Lines } from "../Lines";

export const PublicProfile = (props: { path?: string }) => {
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
      <PageContainer>
        These details will be publicly visible to everyone who sees your profile
        in the <a href={IdentityLocations.COMMUNITY_FAQS}>commenting</a>{" "}
        section.
      </PageContainer>
      <PageContainer>
        <Lines n={1} />
      </PageContainer>
    </>
  );
};
