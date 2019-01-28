import { navigate } from "@reach/router";
import React from "react";
import { fetchMe, MeAsyncLoader, MeResponse } from "../../shared/meResponse";
import { NavItem, navLinks, qualifyLink } from "./nav";
import { PageContainer } from "./page";
import { RouteableProps } from "./wizardRouterAdapter";

export const startRedirect = (navLink: NavItem) => {
  const qualifiedLink = qualifyLink(navLink);
  if (navLink.local) {
    navigate(qualifiedLink, { replace: true });
  } else {
    window.location.replace(qualifiedLink);
  }
};

export const RedirectOnMeResponse = (props: RouteableProps) => (
  <PageContainer>
    <MeAsyncLoader
      fetch={fetchMe}
      render={(me: MeResponse) => {
        if (me.contentAccess.member) {
          startRedirect(navLinks.membership);
        } else if (me.contentAccess.recurringContributor) {
          startRedirect(navLinks.contributions);
        } else {
          startRedirect(navLinks.subscriptions);
        }
        return null; // official way to render nothing, while awaiting redirect to take effect
      }}
      loadingMessage={"Checking your products..."}
    />
  </PageContainer>
);
