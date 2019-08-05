import React from "react";
import { headline } from "../../../styles/fonts";
import { navLinks } from "../../nav";
import { PageHeaderContainer } from "../../page";

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
    </>
  );
};
