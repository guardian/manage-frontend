import React from "react";
import { headline } from "../../styles/fonts";
import { navLinks } from "../nav";
import { PageContainer, PageHeaderContainer } from "../page";

export const EmailAndMarketing = (props: { path?: string }) => {
  return (
    <>
      <PageHeaderContainer selectedNavItem={navLinks.emailPrefs}>
        <h1
          css={{
            fontSize: "2rem",
            lineHeight: "2.25rem",
            fontFamily: headline,
            marginBottom: "30px",
            marginTop: "0"
          }}
        >
          Edit your profile
        </h1>
      </PageHeaderContainer>
      <PageContainer>
        <p>Email editing</p>
      </PageContainer>
    </>
  );
};
