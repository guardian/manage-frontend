import { css, Global } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import React from "react";
// @ts-ignore
import resetCSS from /* preval */ "../../styles/reset-css";
import { ConsentManagementPortal } from "./ConsentMangementPortal";

export const App = () => (
  <>
    <Global styles={css(`${resetCSS}`)} />
    <Global
      styles={css(`
      body {
        overflow-x: hidden;
        background-color: ${palette.brand.main};
      }`)}
    />
    <ConsentManagementPortal />
  </>
);
