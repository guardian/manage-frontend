import { css } from "@emotion/core";
import React, { Component } from "react";
import { OnOffRadio } from "./OnOffRadio";
import { CollapsePurposeItemButton } from "./CollapsePurposeItemButton";
import { VendorItem } from "./VendorItem";
import palette from "../../colours";

const purposeStyles = css`
  margin-top: 6px;
  border-top: 1px solid #dcdcdc;
  padding-top: 4px;
  padding-bottom: 12px;
`;

const purposeLabelStyles = css`
  font-family: "GH Guardian Headline", Georgia, serif;
  font-size: 17px;
  line-height: 20px;
  font-weight: 700;
`;

const purposeDescriptionPanelStyles = (collapsed: boolean) => css`
  display: ${collapsed ? "block" : "none"};
  margin-top: 16px;

  p {
    margin-bottom: 0;
  }
`;

interface Props {
  purposeItemId: PurposeType;
  purpose: Purpose;
  updatePurpose: (updatedPurpose: Purpose) => void;
}

interface State {
  collapsed: boolean;
}

export class PurposeItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  public toggleCollapsed(): void {
    console.log("*** toggleCollapsed ***");
    this.setState((state, props) => ({
      collapsed: !state.collapsed
    }));
  }

  public updatePurposeOnClick(newPurposeValue: boolean): void {
    this.props.updatePurpose({
      ...this.props.purpose,
      purposeValue: newPurposeValue
    });
  }

  public updateVendor(vendorId: number, newVendorValue: boolean): void {
    if (this.props.purpose.vendors && this.props.purpose.vendors[vendorId]) {
      this.props.updatePurpose({
        ...this.props.purpose,
        vendors: {
          ...this.props.purpose.vendors,
          [vendorId]: {
            ...this.props.purpose.vendors[vendorId],
            vendorValue: newVendorValue
          }
        }
      });
    }
  }

  public render(): React.ReactNode {
    const {
      label,
      purposeValue,
      description,
      hasButton,
      vendors
    } = this.props.purpose;
    const { purposeItemId } = this.props;
    const { collapsed } = this.state;

    return (
      <div css={purposeStyles}>
        <CollapsePurposeItemButton
          collapsed={collapsed}
          toggleCollapsed={() => {
            this.toggleCollapsed();
          }}
        />
        <div css={purposeLabelStyles}>{label}</div>
        {/* {hasButton && (
          <OnOffRadio
            radioId={purposeItemId}
            selectedValue={purposeValue}
            onChangeHandler={(newPurposeValue: boolean) => {
              this.updatePurposeOnClick(newPurposeValue);
            }}
          />
        )} */}
        <div css={purposeDescriptionPanelStyles(collapsed)}>
          <p>{description}</p>
          {/* {vendors && this.renderVendors(vendors, purposeItemId)} */}
        </div>
      </div>
    );
  }

  public renderVendors(
    vendors: VendorList,
    purposeItemId: PurposeType
  ): React.ReactNode | void {
    return Object.keys(vendors).map((key: string) => {
      const vendorId = parseInt(key, 10) as number;
      const vendorItemId = `${purposeItemId}-${vendorId}`;
      return (
        <VendorItem
          vendorItemId={vendorItemId}
          vendor={vendors[vendorId]}
          updateVendor={(newVendorValue: boolean): void => {
            this.updateVendor(vendorId, newVendorValue);
          }}
          key={vendorId}
        />
      );
    });
  }
}
