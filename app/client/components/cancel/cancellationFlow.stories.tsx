import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CancellationFlow from "./cancellationFlow";
import { PRODUCT_TYPES } from "../../../shared/productTypes";

import { guardianWeeklyCard } from "../../fixtures/productDetail";

export default {
  title: "Pages/CancellationFlow",
  component: CancellationFlow,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof CancellationFlow>;

export const GuardianWeekly: ComponentStory<typeof CancellationFlow> = () => (
  <CancellationFlow
    path="/"
    productType={PRODUCT_TYPES.guardianweekly}
    location={{ state: { productDetail: guardianWeeklyCard } }}
  />
);
