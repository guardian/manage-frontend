import { css } from "@emotion/core";
import React, { Component } from "react";
import { OnOffRadio } from "./OnOffRadio";
import { CollapsePurposeItemButton } from "./CollapsePurposeItemButton";
import { VendorItem } from "./VendorItem";
import palette from "../../colours";

const purposeContainerStyles = (isLastItem: boolean): string => css`
  margin-top: 6px;
  margin-bottom: ${isLastItem ? "12px" : "0"};
  border-top: 1px solid ${palette.neutral[5]};
  padding-top: 4px;
  padding-bottom: ${isLastItem ? "18px" : "12px"};
  position: relative;

  :after {
    content: "";
    position: absolute;
    left: -12px;
    right: -12px;
    bottom: 0;
    height: 1px;
    background-color: ${palette.neutral[5]};
    display: ${isLastItem ? "block" : "none"};
  }
`;

const purposeTabStyles = css`
  display: flex;
`;

const purposeLabelContainerStyles = css`
  flex-grow: 1;
`;

const purposeLabelStyles = css`
  font-family: "GH Guardian Headline", Georgia, serif;
  font-size: 17px;
  line-height: 20px;
  font-weight: 700;
  max-width: 200px;
`;

const purposeDescriptionPanelStyles = (collapsed: boolean) => css`
  display: ${collapsed ? "block" : "none"};
  padding-top: 16px;
  padding-left: 20px;
`;

interface Props {
  purposeItemId: PurposeType;
  purpose: Purpose;
  updatePurpose: (updatedPurpose: Purpose) => void;
  isLastItem: boolean;
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
    const { purposeItemId, isLastItem } = this.props;
    const { collapsed } = this.state;

    return (
      <div css={purposeContainerStyles(isLastItem)}>
        <div
          css={purposeTabStyles}
          onClick={() => {
            this.toggleCollapsed();
          }}
        >
          <CollapsePurposeItemButton collapsed={collapsed} />
          <div css={purposeLabelContainerStyles}>
            <div css={purposeLabelStyles}>{label}</div>
          </div>
          {hasButton && (
            <OnOffRadio
              radioId={purposeItemId}
              selectedValue={purposeValue}
              onChangeHandler={(newPurposeValue: boolean) => {
                this.updatePurposeOnClick(newPurposeValue);
              }}
            />
          )}
        </div>
        <div css={purposeDescriptionPanelStyles(collapsed)}>
          <p>{description}</p>
          {vendors && this.renderVendors(vendors, purposeItemId)}
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
