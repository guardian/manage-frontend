// import { css } from "@emotion/core";
import React, { Component } from "react";
import { OnOffButton } from "./OnOffButton";

interface Props {
  label: string;
  url: string;
  hasButton?: boolean;
  value: boolean | null;
}

interface State {
  value: boolean | null;
}

export class Vendor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value // Do we want to allow null or just undefined?
    };
  }

  public vendorOn(): void {
    this.setState({
      value: true
    });
  }

  public vendorOff(): void {
    this.setState({
      value: false
    });
  }

  public render(): React.ReactNode {
    return (
      <div>
        <a href={this.props.url}>{this.props.label}</a>
        {this.renderButton()}
      </div>
    );
  }

  private renderButton(): React.ReactNode | void {
    if (this.props.hasButton) {
      return (
        <OnOffButton
          value={this.state.value}
          onOnClick={() => {
            this.vendorOn();
          }}
          onOffClick={() => {
            this.vendorOff();
          }}
        />
      );
    }
  }
}
