import { css } from "@emotion/core";
import React, { Component } from "react";
import { PurposeItem } from "./PurposeItem";

const purposes: PurposeList = {
  essential: {
    label: "Essential",
    purposeValue: null,
    description: "This is essential.",
    hasButton: false
  },
  performance: {
    label: "Performance",
    purposeValue: null,
    description: "This is performance.",
    hasButton: true
  },
  functionality: {
    label: "Functionality",
    purposeValue: null,
    description: "This is functionality.",
    hasButton: true
  },
  personalisedAds: {
    label: "Personalised adversiting",
    purposeValue: null,
    description: "This is personalised adversiting",
    hasButton: true,
    vendors: {
      1: {
        label: "vendor 1",
        vendorValue: null,
        url: "http://www.guardin.co.uk",
        hasButton: false
      },
      2: {
        label: "vendor 2",
        vendorValue: null,
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

interface State {
  purposes: PurposeList;
}

export class PrivacySettings extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = { purposes };
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

  public updateState(purposeId: PurposeType, updatedPurpose: Purpose): void {
    this.setState({
      ...this.state,
      purposes: {
        ...this.state.purposes,
        [purposeId]: updatedPurpose
      }
    });
  }

  public render(): React.ReactNode {
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
            <a href={cookiePolicyURL}>cookie policy</a>
          </p>

          <form id="cmp-form">
            {Object.keys(this.state.purposes).map(
              (key: string): React.ReactNode => {
                const purposeId = key as PurposeType;

                return (
                  <PurposeItem
                    purposeItemId={purposeId}
                    purpose={this.state.purposes[purposeId]}
                    updatePurpose={(updatedPurpose: Purpose) => {
                      this.updateState(purposeId, updatedPurpose);
                    }}
                    key={purposeId}
                  />
                );
              }
            )}
            <p css={bottomPrintCSS}>
              You can change the above settings for this browser at any time by
              accessing the <a href={cookiePolicyURL}>cooking policy</a>
            </p>
            <button
              type="button"
              onClick={() => {
                this.enableAllAndClose();
              }}
            >
              Enable all and close
            </button>
            <button
              type="button"
              onClick={() => {
                this.saveAndClose();
              }}
            >
              Save and close
            </button>
          </form>
        </div>
      </>
    );
  }
}
