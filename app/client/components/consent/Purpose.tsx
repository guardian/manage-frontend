import { css } from "@emotion/core";
import React, { Component } from "react";
import { OnOffButton } from "./OnOffButton";
import { Vendor } from "./Vendor";

const collapsibleDivCSS = (collapsed: boolean) => css`
  display: ${collapsed ? "block" : "none"};
`;

const arrowDown = (
  <svg
    width="12"
    height="9"
    viewBox="-0.525 -4 24 18"
    overflow="visible"
    enable-background="new -0.525 -4 24 18"
  >
    <path d="M23.2.7L12.7 9.1l-1.1.9-1.1-.898L0 .7.5 0l11.1 6.3L22.7 0l.5.7z" />
  </svg>
);

interface Props {
  purpose: Purpose;
  purposeValue: PurposeValue;
  onClickHandler: (value: PurposeValue) => void;
}

interface State {
  collapsed: boolean;
}

export class Purpose extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log("Purpose props", props);
    this.state = {
      collapsed: false
    };
  }

  public toggleCollapsed(): void {
    this.setState((state, props) => ({
      collapsed: !state.collapsed
    }));
  }

  public updtPurpose(newPuposeValue: boolean): void {
    const purposeValue: PurposeValue = {
      purposeValue: newPuposeValue,
      vendorValues: this.props.purposeValue.vendorValues
    };
    this.props.onClickHandler(purposeValue);
  }

  public updtVendorValue(vendorID: number, newVendorValue: boolean): void {
    // Pass the vendor change only vendors: {newVendorValue: thing}
    //this.props.onClickHandler(newVendorValue);

    const purposeValue: PurposeValue = {
      purposeValue: this.props.purposeValue.purposeValue,
      vendorValues: this.props.purposeValue.vendorValues
    };

    purposeValue.vendorValues[vendorID].vendorValue = newVendorValue;
    console.log(vendorID, newVendorValue, purposeValue);

    //this.props.onClickHandler(purposeValue);
  }

  public render(): React.ReactNode {
    return (
      <div>
        {/* Expand button */}
        <button
          onClick={() => {
            this.toggleCollapsed();
          }}
        >
          {arrowDown}
        </button>

        {/* Label */}
        {this.props.label}

        {/* On/Off button */}
        <OnOffButton
          buttonValue={this.props.purposeValue}
          onClickHandler={(newPurposeValue: PurposeType) => {
            this.updtPurpose(newPurposeValue);
          }}
        />

        {/* Collapsible div */}
        <div css={collapsibleDivCSS(this.state.collapsed)}>
          {this.props.description}
          {this.renderVendors()}
        </div>
      </div>
    );
  }

  private renderVendors(): React.ReactNode | void {
    const vendors = this.props.vendors;
    if (!vendors) return;
    return Object.keys(vendors).map((vendor: number) => {
      const { vendorValue, label, url, hasButton } = this.props.vendors[vendor];
      return (
        <Vendor
          vendorValue={vendorValue}
          label={label}
          url={url}
          hasButton={hasButton}
          onClickHandler={(value: number) => {
            this.updtVendorValue(vendor, value);
          }}
        />
      );
    });
  }
}
