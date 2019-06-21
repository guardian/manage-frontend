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

    this.state = {
      collapsed: false
    };
  }

  toggleCollapsed(): void {
    this.setState((state, props) => ({
      collapsed: !state.collapsed
    }));
  }

  updatePurposeOnClick(newPurposeValue: boolean): void {
    const newPurposeState = this.props.purpose;

    newPurposeState.purposeValue = newPurposeValue;

    this.props.updatePurpose(newPurposeState);
  }

  render(): React.ReactNode {
    const { label, purposeValue, description, hasButton } = this.props.purpose;
    const { collapsed } = this.state;

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
        {label}

        {/* On/Off button */}
        {hasButton && (
          <OnOffButton
            buttonValue={purposeValue}
            onClickHandler={(newPurposeValue: PurposeType) => {
              this.updatePurposeOnClick(newPurposeValue);
            }}
          />
        )}

        {/* Collapsible div */}
        <div css={collapsibleDivCSS(collapsed)}>
          {description}
          {this.renderVendors()}
        </div>
      </div>
    );
  }

  renderVendors(): React.ReactNode | void {
    const { vendors } = this.props.purpose;

    if (!vendors) {
      return;
    }

    return Object.keys(vendors).map((vendorId: number) => {
      const vendor = vendors[vendorId];

      return (
        <Vendor
          vendor={vendors[vendorId]}
          updateVendor={(newVendorValue: boolean): void => {
            const newPurposeState = this.props.purpose;

            newPurposeState.vendors[vendorId].vendorValue = newVendorValue;

            this.props.updatePurpose(newPurposeState);
          }}
        />
      );
    });
  }
}
