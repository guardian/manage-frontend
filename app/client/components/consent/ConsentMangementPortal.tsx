import { css } from "@emotion/core";
import React, { Component } from "react";
import { palette } from "@guardian/src-foundations";
import { minWidth } from "../../styles/breakpoints";
import { TheGuardianLogo } from "../svgs/theGuardianLogo";
import { PrivacySettings } from "./PrivacySettings";

const headerCSS = css`
  background-color: ${palette.brand.main};
  position: fixed;
  top: 0;
  width: 95%;
  max-width: 450px;
  border-bottom: 1px solid ${palette.brand.pastel};
  display: flex;
  z-index: 1;

  ::before {
    content: "";
    display: block;
    flex: 1;
    height: 90px;
    ${minWidth.mobileLandscape} {
      height: 114px;
    }
  }
`;

const logoStyles = css`
  width: 224px;

  ${minWidth.mobileLandscape} {
    width: 295px;
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
