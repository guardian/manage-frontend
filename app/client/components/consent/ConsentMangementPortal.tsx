import { css } from "@emotion/core";
import React, { Component } from "react";
import { Button } from "./Button";

const headerStyles = color => css`
  color: ${color};
  font-family: "GH Guardian Headline", Georgia, serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  margin: 12px;
`;
export class ConsentManagementPortal extends Component<{}, { color: string }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      color: "red"
    };
  }

  public componentDidMount() {
    // get cookies here
    console.log(
      "componentDidMount() is invoked once - immediately after a component is mounted in the browser"
    );
  }

  public toggleColor() {
    const newColor = this.state.color === "red" ? "blue" : "red";

    this.setState({
      color: newColor
    });
  }

  public render() {
    const { color } = this.state;

    return (
      <>
        <h1 css={headerStyles(color)}>Click the button...</h1>
        <Button
          onClick={() => {
            this.toggleColor();
          }}
        />
      </>
    );
  }
}
