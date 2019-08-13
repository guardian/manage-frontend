import { css } from "@emotion/core";
import React, { Component } from "react";
import palette from "../../colours";
import { TickIcon } from "../svgs/tickIcon";
import { CmpItem } from "./CmpItem";

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
  iabPurposes: { [key: number]: boolean | null };
}

interface IabPurpose {
  id: number;
  name: string;
  description: string;
}

interface IabFeature {
  id: number;
  name: string;
  description: string;
}

interface IabVendors {
  id: number;
  name: string;
  policyUrl: string;
  purposeIds: number[];
  legIntPurposeIds: number[];
  featureIds: number[];
}

export class PrivacySettings extends Component<{}, State> {
  public iabVendorList?: {
    vendorListVersion: number;
    lastUpdated: string;
    purposes: IabPurpose[];
    features: IabFeature[];
    vendors: IabVendors[];
  };

  constructor(props: {}) {
    super(props);

    this.state = { iabPurposes: {} };
  }

  public componentDidMount(): void {
    fetch(
      "https://assets.guim.co.uk/data/vendor/4f4a6324c7fe376c17ceb2288a84a076/cmp_vendorlist.json"
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Vendor List not ok");
        }
      })
      .then(json => {
        // tslint:disable-next-line: no-object-mutation
        this.iabVendorList = json;
        this.buildState();
      })
      .catch(error => {
        // tslint:disable-next-line: no-console
        console.log("ERROR:", error);
      });
    // TODO: get cookies here
  }

  public buildState(): void {
    if (this.iabVendorList && this.iabVendorList.purposes) {
      const iabPurposes = this.iabVendorList.purposes.reduce((acc, purpose) => {
        return { ...acc, [purpose.id]: null };
      }, {});

      this.setState({ iabPurposes });
    }
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

  public updatePurpose(purposeId: number, value: boolean): void {
    this.setState((prevState, props) => ({
      iabPurposes: {
        ...prevState.iabPurposes,
        [purposeId]: value
      }
    }));
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
    if (!this.iabVendorList || !this.iabVendorList.purposes) {
      return "";
    }

    const length = this.iabVendorList.purposes.length;
    return this.iabVendorList.purposes.map(
      (purpose: IabPurpose, index: number): React.ReactNode => {
        const { id, name, description } = purpose;

        return (
          <CmpItem
            id={id}
            name={name}
            description={description}
            value={this.state.iabPurposes[id]}
            updateItem={(updatedValue: boolean) => {
              this.updatePurpose(id, updatedValue);
            }}
            key={id}
            isLastItem={index === length - 1}
          />
        );
      }
    );
  }
}
