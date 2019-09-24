import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import React, { Component } from "react";
import { minWidth } from "../../styles/breakpoints";
import { TheGuardianLogo } from "../svgs/theGuardianLogo";
import { PrivacySettings } from "./PrivacySettings";

const headerCSS = css`
  background-color: ${palette.brand.main};
  position: fixed;
  top: 0;
  width: 100%;
  padding: 6px ${space[2]}px 12px 0;
  ${minWidth.mobileLandscape} {
    width: 95%;
    max-width: 450px;
    padding-right: 0;
  }
  border-bottom: 1px solid ${palette.brand.pastel};
  display: flex;
  z-index: 10;

  ::before {
    content: "";
    display: block;
    flex: 1;
    height: 100%;
  }
`;

const logoStyles = css`
  height: 55px;

  ${minWidth.mobileLandscape} {
    height: 90px;
  }

  path {
    fill: ${palette.neutral[100]};
  }
`;

export class ConsentManagementPortal extends Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div>
        <div css={headerCSS}>
          <TheGuardianLogo css={logoStyles} />
        </div>
        <PrivacySettings />
      </div>
    );
  }
}
