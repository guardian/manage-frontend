import { css, Global } from "@emotion/core";
import React from "react";
// @ts-ignore
import resetCSS from /* preval */ "../../styles/reset-css";
import { ConsentManagementPortal } from "./ConsentMangementPortal";
import palette from "../../colours";

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
