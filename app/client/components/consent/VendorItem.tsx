// import { css } from "@emotion/core";
import React, { Component } from "react";
import { OnOffRadio } from "./OnOffRadio";

interface Props {
  vendorItemId: string;
  vendor: Vendor;
  updateVendor: (newVendorValue: boolean) => void;
}

export class VendorItem extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public updateVendorOnClick(newVendorValue: boolean): void {
    this.props.updateVendor(newVendorValue);
  }

  public renderButton(vendorValue: boolean | null): React.ReactNode | void {
    return (
      <OnOffRadio
        radioId={this.props.vendorItemId}
        selectedValue={vendorValue}
        onChangeHandler={(newVendorValue: boolean) => {
          this.updateVendorOnClick(newVendorValue);
        }}
      />
    );
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
}
