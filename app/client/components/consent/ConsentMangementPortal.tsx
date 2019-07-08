import { css } from "@emotion/core";
import React, { Component } from "react";
import { PrivacySettings } from "./PrivacySettings";

const containerCSS = css`
  max-width: 340px;
  border: 1px solid black;
`;

const headerCSS = css`
  font-family: "GH Guardian Headline", Georgia, serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  margin: 12px;
`;

export class ConsentManagementPortal extends Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div className="cmp-container" css={containerCSS}>
        <h1 css={headerCSS}>The Guardian</h1>
        <PrivacySettings />
      </div>
    );
  }
}
