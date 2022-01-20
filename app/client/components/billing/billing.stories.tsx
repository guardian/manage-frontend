import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import fetchMock from "fetch-mock";

import Billing from "./billing";
import {
  guardianWeeklyCard,
  digitalDD,
  newspaperVoucherPaypal,
} from "../../fixtures/productDetail";
import { idapiUser } from "../../fixtures/idapiUser";

export default {
  title: "Pages/Billing",
  component: Billing,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Billing>;

export const NoSubscription: ComponentStory<typeof Billing> = () => {
  fetchMock
    .restore()
    .get("/api/me/mma", { body: [] })
    .get("/api/invoices", { body: { invoices: [] } })
    .get("/idapi/user", { body: idapiUser });

  return <Billing />;
};

export const WithSubscriptions: ComponentStory<typeof Billing> = () => {
  fetchMock
    .restore()
    .get("/api/me/mma", {
      body: [guardianWeeklyCard, digitalDD, newspaperVoucherPaypal],
    })
    .get("/api/invoices", { body: { invoices: [] } });

  return <Billing />;
};
