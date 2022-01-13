import React from "react";
import { css, Global } from "@emotion/core";
import { fonts } from "../client/styles/fonts";
import global from "../client/styles/global";
import { viewport } from "./viewport";

export const decorators = [
  (Story) => (
    <>
      <Global styles={css(`${global}`)} />
      <Global styles={css(`${fonts}`)} />
      <Story />
    </>
  ),
];

export const parameters = {
  viewport,
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
