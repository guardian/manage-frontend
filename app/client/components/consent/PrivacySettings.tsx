import { css } from "@emotion/core";
import React, { Component } from "react";
import { Purpose } from "./Purpose";

const purposeTypes: PurposeList = {
  essential: {
    label: "Essential",
    description: "This is essential.",
    hasButton: false,
    vendors: null
  },
  performance: {
    label: "Performance",
    description: "This is performance.",
    hasButton: true,
    vendors: null
  },
  functionality: {
    label: "Functionality",
    description: "This is functionality.",
    hasButton: true,
    vendors: null
  },
  personalisedAds: {
    label: "Personalised adversiting",
    description: "This is personalised adversiting",
    hasButton: true,
    vendors: {
      1: {
        label: "vendor 1",
        url: "http://www.guardin.co.uk",
        hasButton: false
      },
      2: {
        label: "vendor 2",
        url: "http://www.guardin.co.uk",
        hasButton: true
      }
    }
  }
};

const choicesCSS = css`
  border-top: 2px solid black;
  border-bottom: 2px solid black;
`;

const bottomPrintCSS = css`
  font-style: italic;
`;

const privacyPolicyURL = "http://www.theguardian.com";

const cookiePolicyURL = "http://www.theguardian.com";

interface State extends PurposeValueList {}

export class PrivacySettings extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = this.buildPurposeValues();
    console.log(this.state);
  }

  private buildPurposeValues(): PurposeValueList {
    const purposeValues = Object.keys(purposeTypes).reduce(
      (prevPurposeState: Object, purpose: PurposeType) => {
        prevPurposeState[purpose] = {
          purposeValue: null,
          vendorValues: this.buildVendorValues(purpose)
        };
        return prevPurposeState;
      },
      {}
    );

    return Object.entries(purposeValues).length ? purposeValues : null;
  }

  private buildVendorValues(purpose: PurposeType): VendorValueList {
    const vendors = purposeTypes[purpose].vendors;
    if (!vendors) return null;
    const vendorValues = Object.keys(vendors).reduce(
      (prevVendorState: Object, vendor: string) => {
        prevVendorState[vendor] = {
          vendorValue: null
        };
        return prevVendorState;
      },
      {}
    );
    return Object.entries(vendorValues).length ? vendorValues : null;
  }

  public componentDidMount(): void {
    // TODO: get cookies here
  }

  public enableAllAndClose(): void {
    // TODO: Enable all purposes and vendors
    this.saveAndClose();
  }

  public saveAndClose(): void {
    this.saveSettings();
    // TODO: If save was successful and it's on a modal, close the modal
  }

  public saveSettings(): boolean {
    // TODO: Check if all purposes have been answered
    // TODO: Actually save the settings to the cookie
    const success = true;
    return success;
  }

  public updtState(purposeID: PurposeType, newValue: PurposeValue): void {
    const newState = this.state;
    newState[purposeID] = newValue;
    this.setState(newState);
  }

  public render(): React.ReactNode {
    console.log("Render", this.state);
    return (
      <>
        {/* Choices */}
        <div css={choicesCSS}>
          <h2>Privacy settings</h2>
          <p>
            Below you can manage your privacy settings for cookies and similar
            technologies for this service. These technologies are provided by us
            and by our third-party partners. To find out more, read our{" "}
            <a href={privacyPolicyURL}>privacy policy</a> and{" "}
            <a href={cookiePolicyURL}>cooking policy</a>
          </p>
          <br />
          {Object.keys(purposeTypes).map((purpose: PurposeType) => {
            const { label, description, hasButton, vendors } = purposeTypes[
              purpose
            ];
            return (
              <Purpose
                purposeValue={this.state[purpose].purposeValue}
                label={label}
                description={description}
                hasButton={hasButton}
                vendors={vendors}
                onClickHandler={(value: PurposeType) => {
                  this.updtState(purpose, value);
                }}
              />
            );
          })}
          <p css={bottomPrintCSS}>
            You can change the above settings for this browser at any time by
            accessing the <a href={cookiePolicyURL}>cooking policy</a>
          </p>
          <br />
        </div>
        {/* Buttons */}
        <button
          onClick={() => {
            this.enableAllAndClose();
          }}
        >
          Enable all and close
        </button>
        <button
          onClick={() => {
            this.saveAndClose();
          }}
        >
          Save and close
        </button>
      </>
    );
  }
}
