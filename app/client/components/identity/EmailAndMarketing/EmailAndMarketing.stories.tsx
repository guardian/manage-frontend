import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import fetchMock from "fetch-mock";

import EmailAndMarketing from "./";
import {
  guardianWeeklyCard,
  digitalDD,
  newspaperVoucherPaypal,
} from "../../../fixtures/productDetail";
import { idapiUser } from "../../../fixtures/idapiUser";
import { newsletters } from "../../../fixtures/newsletters";
import { newsletterSubscriptions } from "../../../fixtures/newsletterSubscriptions";
import { consents } from "../../../fixtures/consents";

export default {
  title: "Pages/EmailAndMarketing",
  component: EmailAndMarketing,
  parameters: {
    controls: { disabled: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof EmailAndMarketing>;

export const Default: ComponentStory<typeof EmailAndMarketing> = () => {
  fetchMock
    .restore()
    .get("/api/me/mma", {
      body: [guardianWeeklyCard, digitalDD, newspaperVoucherPaypal],
    })
    .get("/idapi/user", { body: idapiUser })
    .get("/idapicodeproxy/newsletters", { body: newsletters })
    .get("/idapicodeproxy/users/me/newsletters", {
      body: newsletterSubscriptions,
    })
    .get("/idapicodeproxy/consents?filter=all", { body: consents })
    .get("/api/reminders/status", { body: { recurringStatus: "NotSet" } });

  return <EmailAndMarketing />;
};
