import { css } from "@emotion/core";
import React, { Component } from "react";
import { PrivacySettings } from "./PrivacySettings";

const iosFixStyles = css`
  height: 1px;
  min-height: 100vh;
  overflow-y: scroll;
`;

export class ConsentManagementPortal extends Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div css={iosFixStyles} id="scrollable">
        <PrivacySettings />
      </div>
    );
  }
}
