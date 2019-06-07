import { css, Global } from "@emotion/core";
import React from "react";
import { ConsentManagementPortal } from "./ConsentMangementPortal";
import { fonts } from "../../styles/fonts";
import resetCSS from /* preval */ "../../styles/reset-css";

export const App = () => (
  <>
    <Global styles={css(`${resetCSS}`)} />
    <Global styles={css(`${fonts}`)} />
    <ConsentManagementPortal />
  </>
);
