// import { css } from "@emotion/core";
import React, { Component } from "react";
import { OnOffButton } from "./OnOffButton";

interface Props extends Vendor, VendorValue {
  updateVendor: (newVendorValue: VendorValue) => void;
}

export class Vendor extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public updateVendorOnClick(newVendorValue: boolean): void {
    this.props.updateVendor(newVendorValue);
  }

  public render(): React.ReactNode {
    const { url, label, hasButton, vendorValue } = this.props.vendor;
    return (
      <div>
        <a href={url}>{label}</a>
        {hasButton && this.renderButton(vendorValue)}
      </div>
    );
  }

  private renderButton(vendorValue): React.ReactNode | void {
    return (
      <OnOffButton
        buttonValue={vendorValue}
        onClickHandler={(newVendorValue: boolean) => {
          this.updateVendorOnClick(newVendorValue);
        }}
      />
    );
    // }
  }
}
