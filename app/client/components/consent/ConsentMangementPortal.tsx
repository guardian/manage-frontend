import { css } from "@emotion/core";
import React, { Component } from "react";

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
    setInterval(() => {
      const newColor = this.state.color === "red" ? "blue" : "red";

      this.setState({
        color: newColor
      });
    }, 500);
  }

  public render() {
    const { color } = this.state;

    return <h1 css={headerStyles(color)}>Wait for it...</h1>;
  }
}
