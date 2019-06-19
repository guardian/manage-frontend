import { css, Global } from "@emotion/core";
import React from "react";
import { fonts } from "../../styles/fonts";
// @ts-ignore
import resetCSS from /* preval */ "../../styles/reset-css";
import { ConsentManagementPortal } from "./ConsentMangementPortal";

export const App = () => (
  <>
    <Global styles={css(`${resetCSS}`)} />
    <Global styles={css(`${fonts}`)} />
    <ConsentManagementPortal />
  </>
);
