import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import React, { Component } from "react";
import { minWidth } from "../../styles/breakpoints";
import { TheGuardianLogo } from "../svgs/theGuardianLogo";
import { PrivacySettings } from "./PrivacySettings";

const HEADER_ID = "header";
const SCROLLABLE_ID = "scrollable";
const CONTAINER_ID = "container";

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
const scrollableStyles = (scrollbarWidth: number) => css`
  height: 1px;
  min-height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  margin-right: ${-scrollbarWidth}px;
`;

interface State {
  headerWidth: number;
  scrollbarWidth: number;
}

export class ConsentManagementPortal extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      headerWidth: 0,
      scrollbarWidth: 0
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
        <div
          css={scrollableStyles(this.state.scrollbarWidth)}
          id={SCROLLABLE_ID}
        >
          <PrivacySettings
            hideScrollBar={(): void => {
              // if (document) {
              const scrollableElem = document.getElementById(SCROLLABLE_ID);

              if (!scrollableElem) {
                return;
              }

              const scrollbarWidth =
                scrollableElem.offsetWidth - scrollableElem.clientWidth;

              this.setState(
                {
                  scrollbarWidth
                },
                () => {
                  this.updateHeaderWidth();
                }
              );
              // }
            }}
          />
        </div>
      </>
    );
  }

  private updateHeaderWidth(): void {
    // if (document) {
    const containerElem = document.getElementById(CONTAINER_ID);

    if (!containerElem) {
      return;
    }

    const headerWidth = containerElem.offsetWidth;

    this.setState({
      headerWidth
    });
    // }
  }
}
