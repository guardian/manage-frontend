import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import React, { Component } from "react";
import { minWidth } from "../../styles/breakpoints";
import { TheGuardianLogo } from "../svgs/theGuardianLogo";
import { PrivacySettings } from "./PrivacySettings";

const HEADER_ID = "header";
const SCROLLABLE_ID = "scrollable";

const headerCSS = (headerWidth: number) => css`
  background-color: ${palette.brand.main};
  position: fixed;
  top: 0;
  z-index: 200;
  width: 100%;
  ${minWidth.mobileLandscape} {
    width: ${headerWidth}px;
  }
`;

const logoContainer = css`
  padding: 6px ${space[2]}px 12px 0;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid ${palette.brand.pastel};
  display: flex;
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

/**
 * Force the height of the scrollable to 100vh
 * because it forces the parent iframe height on iOS
 */
const scrollableStyles = css`
  height: 1px;
  min-height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

interface State {
  headerWidth: number;
}

export class ConsentManagementPortal extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      headerWidth: 0
    };
  }

  public render(): React.ReactNode {
    return (
      <>
        <div css={headerCSS(this.state.headerWidth)} id={HEADER_ID}>
          <div css={logoContainer}>
            <TheGuardianLogo css={logoStyles} />
          </div>
        </div>
        <div css={scrollableStyles} id={SCROLLABLE_ID}>
          <PrivacySettings
            updateHeaderWidth={(headerWidth: number): void => {
              this.setState({
                headerWidth
              });
            }}
          />
        </div>
      </>
    );
  }
}
