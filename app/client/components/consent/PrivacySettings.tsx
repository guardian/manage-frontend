import { css } from "@emotion/core";
import React, { Component } from "react";
import TickIcon from "../../../images/tick.svg";
import palette from "../../colours";
import { PurposeItem } from "./PurposeItem";

const purposes: PurposeList = {
  essential: {
    label: "Essential",
    purposeValue: null,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    hasButton: false
  },
  performance: {
    label: "Performance",
    purposeValue: null,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    hasButton: true
  },
  functionality: {
    label: "Functionality",
    purposeValue: null,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    hasButton: true
  },
  personalisedAds: {
    label: "Personalised adversiting",
    purposeValue: null,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    hasButton: true,
    vendors: {
      1: {
        label: "vendor 1",
        vendorValue: null,
        url: "http://www.guardin.co.uk",
        hasButton: true
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
const privacyPolicyURL = "http://www.theguardian.com";
const cookiePolicyURL = "http://www.theguardian.com";

const containerStyles = css`
  margin: 6px 12px 0;
  color: ${palette.neutral[2]};

  p {
    margin-bottom: 16px;
    font-size: 17px;
    line-height: 24px;
    font-family: "Guardian Text Egyptian Web", Georgia, serif;
  }
`;

const headerStyles = css`
  font-size: 28px;
  line-height: 32px;
  font-family: "GH Guardian Headline", Georgia, serif;
  font-weight: 400;
  margin-bottom: 12px;
`;

const buttonContainerStyles = css`
  height: 66px;
  bottom: 0;
  position: sticky;
  margin-left: -12px;
  margin-right: -12px;
  background-color: ${palette.neutral[7]};
  border-top: 1px solid ${palette.neutral[5]};
  display: flex;
  padding: 12px 6px;
`;

const buttonStyles = css`
  font-size: 16px;
  line-height: 22px;
  font-family: "Guardian Text Sans Web", Helvetica Neue, Helvetica, Arial,
    Lucida Grande, sans-serif;
  font-weight: 700;
  align-items: center;
  text-decoration: none;
  height: 42px;
  min-height: 42px;
  padding: 0 6px;
  border: none;
  border-radius: 21px;
  box-sizing: border-box;
  background: transparent;
  cursor: pointer;
  position: relative;
  background-color: ${palette.yellow.medium};
  flex-grow: 1;
  margin: 0 6px;
`;

const tickIconStyles = css`
  height: 20px;
  width: 20px;
  flex-grow: 0;
`;

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
      <div css={containerStyles}>
        <h1 css={headerStyles}>Privacy settings</h1>

        <p>
          Below you can manage your privacy settings for cookies and similar
          technologies for this service. These technologies are provided by us
          and by our third-party partners. To find out more, read our{" "}
          <a href={privacyPolicyURL}>privacy policy</a> and{" "}
          <a href={cookiePolicyURL}>cookie policy</a>
        </p>

        <form id="cmp-form">
          {this.renderPurposeItems()}

          <p>
            You can change the above settings for this browser at any time by
            accessing the{" "}
            <a
              href={cookiePolicyURL}
              css={css`
                color: ${palette.neutral[2]};
              `}
            >
              cookie policy
            </a>
          </p>

          <div css={buttonContainerStyles}>
            <button
              type="button"
              onClick={() => {
                this.enableAllAndClose();
              }}
              css={css`
                ${buttonStyles};
                min-width: 190px;
                display: flex;
                padding-left: 16px;
              `}
            >
              <TickIcon css={tickIconStyles} />
              <span
                css={css`
                  flex-grow: 1;
                `}
              >
                Enable all and close
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                this.saveAndClose();
              }}
              css={css`
                ${buttonStyles};
                background-color: ${palette.yellow.dark};
              `}
            >
              Save and close
            </button>
          </div>
        </form>
      </div>
    );
  }

  public renderPurposeItems(): React.ReactNode {
    const purposeItemKeys = Object.keys(this.state.purposes);
    const purposeItemCount = purposeItemKeys.length;

    return purposeItemKeys.map(
      (key: string, index: number): React.ReactNode => {
        const purposeId = key as PurposeType;

        return (
          <PurposeItem
            purposeItemId={purposeId}
            purpose={this.state.purposes[purposeId]}
            updatePurpose={(updatedPurpose: Purpose) => {
              this.updateState(purposeId, updatedPurpose);
            }}
            key={purposeId}
            isLastItem={index === purposeItemCount - 1}
          />
        );
      }
    );
  }
}
