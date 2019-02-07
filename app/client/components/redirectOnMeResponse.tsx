import { navigate } from "@reach/router";
import React from "react";
import { fetchMe, MeAsyncLoader, MeResponse } from "../../shared/meResponse";
import { navLinks } from "./nav";
import { PageContainer } from "./page";
import { RouteableProps } from "./wizardRouterAdapter";

const startRedirect = (link: string) => navigate(link, { replace: true });

export const RedirectOnMeResponse = (props: RouteableProps) => (
  <PageContainer>
    <MeAsyncLoader
      fetch={fetchMe}
      render={(me: MeResponse) => {
        if (me.contentAccess.member) {
          startRedirect(navLinks.membership.link);
        } else if (me.contentAccess.recurringContributor) {
          startRedirect(navLinks.contributions.link);
        } else {
          startRedirect(navLinks.subscriptions.link);
        }
        return null; // official way to render nothing, while awaiting redirect to take effect
      }}
      loadingMessage={"Checking your products..."}
    />
  </PageContainer>
);
