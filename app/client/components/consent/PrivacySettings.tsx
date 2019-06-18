import { css } from "@emotion/core";
import React, { Component } from "react";
import { Purpose } from "./Purpose";

const choicesCSS = css`
  border-top: 2px solid black;
  border-bottom: 2px solid black;
`;

const bottomPrintCSS = css`
  font-style: italic;
`;

const privacyPolicyURL = "http://www.theguardian.com";

const cookiePolicyURL = "http://www.theguardian.com";

export class PrivacySettings extends Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public componentDidMount() {
    // get cookies here
    console.log(
      "componentDidMount() is invoked once - immediately after a component is mounted in the browser"
    );
  }

  public toggleColor() {
    const newColor = this.state.color === "red" ? "blue" : "red";
  }

  public saveAndClose() {}

  public enableAllAndClose() {}

  public render() {
    return (
      <>
        {/* Choices */}
        <div css={choicesCSS}>
          <h2>Privacy settings</h2>
          <p>
            Below you can manage your privacy settings for cookies and similar
            technologies for this service. These technologies are provided by us
            and by our third-party partners. To find out more, read our{" "}
            <a href={privacyPolicyURL}>privacy policy</a> and{" "}
            <a href={cookiePolicyURL}>cooking policy</a>
          </p>
          <br />
          <Purpose type="essential" />
          <Purpose type="performance" />
          <Purpose type="functionality" />
          <Purpose type="personalised-ads" />
          <p css={bottomPrintCSS}>
            You can change the above settings for this browser at any time by
            accessing the <a href={cookiePolicyURL}>cooking policy</a>
          </p>
          <br />
        </div>
        {/* Buttons */}
        <button
          onClick={() => {
            this.enableAllAndClose();
          }}
        >
          Enable all and close
        </button>
        <button
          onClick={() => {
            this.saveAndClose();
          }}
        >
          Save and close
        </button>
      </>
    );
  }
}
