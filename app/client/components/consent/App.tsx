import { css, Global } from "@emotion/core";
import React from "react";
// @ts-ignore
import resetCSS from /* preval */ "../../styles/reset-css";
import { ConsentManagementPortal } from "./ConsentMangementPortal";

export const App = () => (
  <>
    <Global styles={css(`${resetCSS}`)} />
    <ConsentManagementPortal />
  </>
);
