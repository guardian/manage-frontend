// import { css } from "@emotion/core";
import React, { Component } from "react";
import { OnOffButton } from "./OnOffButton";

interface Props extends Vendor, VendorValue {
  onClickHandler: (newVendorValue: VendorValue) => void;
}

export class Vendor extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public updtVendor(newVendorValue: boolean): void {
    this.props.onClickHandler(newVendorValue);
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
          buttonValue={this.props.vendorValue}
          onClickHandler={(newVendorValue: boolean) => {
            this.updtVendor(newVendorValue);
          }}
        />
      );
    }
  }
}
