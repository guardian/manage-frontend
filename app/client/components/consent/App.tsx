import { css, Global } from "@emotion/core";
import React from "react";
import palette from "../../colours";
// @ts-ignore
import resetCSS from /* preval */ "../../styles/reset-css";
import { ConsentManagementPortal } from "./ConsentMangementPortal";

export const App = () => (
  <>
    <Global styles={css(`${resetCSS}`)} />
    <Global
      styles={css(`
      body {
        background-color: ${palette.blue.header};
      }`)}
    />
    <ConsentManagementPortal />
  </>
);
