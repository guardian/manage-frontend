import { css } from "@emotion/core";
import React, { Component } from "react";
import { Button } from "./Button";

const headerStyles = color => css`
  color: ${color};
  font-size: 24px;
`;
export class ConsentManagementPortal extends Component<{}, { color: string }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      color: "red"
    };
  }

  public componentDidMount() {
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
