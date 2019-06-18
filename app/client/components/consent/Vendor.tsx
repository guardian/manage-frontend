import { css } from "@emotion/core";
import { url } from "inspector";
import React, { Component } from "react";
import { OnOffButton } from "./OnOffButton";

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
        <a href={this.props.url}>{this.props.label}</a>
        {this.renderButton()}
      </div>
    );
  }

  private renderButton() {
    if (this.props.hasButton) {
      return (
        <OnOffButton
          value={this.state.vendor}
          onOnClick={() => {
            this.vendorOn();
          }}
          onOffClick={() => {
            this.vendorOff();
          }}
        />
      );
    }

    return null;
  }
}
