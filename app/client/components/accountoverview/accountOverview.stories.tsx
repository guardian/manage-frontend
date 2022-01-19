import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import fetchMock from "fetch-mock";

import { Main } from "../main";
import AccountOverview from "./accountOverview";
import {
  guardianWeeklyCard,
  digitalDD,
  newspaperVoucherPaypal,
} from "../../fixtures/productDetail";
import { idapiUser } from "../../fixtures/idapiUser";

export default {
  title: "Pages/AccountOverview",
  component: AccountOverview,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof AccountOverview>;

export const NoSubscription: ComponentStory<typeof AccountOverview> = () => {
  fetchMock
    .restore()
    .get("/api/cancelled/", { body: [] })
    .get("/api/me/mma", { body: [] })
    .get("/idapi/user", { body: idapiUser });

  return (
    <Main signInStatus="signedIn">
      <AccountOverview />
    </Main>
  );
};

export const WithSubscriptions: ComponentStory<typeof AccountOverview> = () => {
  fetchMock
    .restore()
    .get("/api/cancelled/", { body: [] })
    .get("/api/me/mma", {
      body: [guardianWeeklyCard, digitalDD, newspaperVoucherPaypal],
    });

  return (
    <Main signInStatus="signedIn">
      <AccountOverview />
    </Main>
  );
};
