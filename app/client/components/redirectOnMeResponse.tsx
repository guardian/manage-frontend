import { navigate } from "@reach/router";
import React from "react";
import { fetchMe, MeAsyncLoader, MeResponse } from "../../shared/meResponse";
import { navLinks, qualifyLink } from "./nav";
import { PageContainer } from "./page";
import { RouteableProps } from "./wizardRouterAdapter";

export const RedirectOnMeResponse = (props: RouteableProps) => (
  <PageContainer>
    <MeAsyncLoader
      fetch={fetchMe}
      render={(me: MeResponse) => {
        const replace = { replace: true };
        if (me.contentAccess.member) {
          navigate(qualifyLink(navLinks.membership), replace);
        } else if (me.contentAccess.recurringContributor) {
          navigate(qualifyLink(navLinks.contributions), replace);
        } else if (me.contentAccess.digitalPack) {
          navigate(qualifyLink(navLinks.digiPack), replace);
        } else {
          navigate(qualifyLink(navLinks.membership), replace);
        }
        return null; // official way to render nothing
      }}
      loadingMessage={"Checking your products..."}
    />
  </PageContainer>
);
