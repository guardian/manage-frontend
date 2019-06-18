import { css } from "@emotion/core";
import { url } from "inspector";
import React, { Component } from "react";

const onButtonCSS = vendor => css`
  float: right;
  ${vendor === true ? "background-color: gray;" : ""};
`;

const offButtonCSS = vendor => css`
  float: right;
  ${vendor === false ? "background-color: gray;" : ""};
`;

export class Vendor extends Component<
  {},
  { label: string; url: string; hasButton: boolean }
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      vendor: null
    };
  }
  public vendorOn() {
    this.setState({
      vendor: true
    });
  }

  public vendorOff() {
    this.setState({
      vendor: false
    });
  }

  public render() {
    return (
      <div>
        {/* Label */}
        {this.props.label}

        {/* Toggle button */}
        {this.printButton()}
      </div>
    );
  }

  private printButton() {
    if (this.props.hasButton) {
      return (
        <>
          <button
            css={onButtonCSS(this.state.vendor)}
            onClick={() => {
              this.vendorOn();
            }}
          >
            on
          </button>
          <button
            css={offButtonCSS(this.state.vendor)}
            onClick={() => {
              this.vendorOff();
            }}
          >
            off
          </button>
        </>
      );
    }

    return null;
  }
}
