import { css } from "@emotion/core";
import { ConsentString } from "consent-string";
import React, { Component } from "react";
import palette from "../../colours";
import { CmpCollapsible } from "./CmpCollapsible";
import { CmpItem } from "./CmpItem";
import { CmpSeparator } from "./CmpSeparator";
import { writeVendorConsentCookie } from "./Cookie";

const CMP_ID = 112;
const CMP_VERSION = 1;
const CONSENT_SCREEN = 0;
const CONSENT_LANGUAGE = "en";

const iabVendorListURL =
  "https://assets.guim.co.uk/data/vendor/4f4a6324c7fe376c17ceb2288a84a076/cmp_vendorlist.json";
const privacyPolicyURL = "https://www.theguardian.com/info/privacy";
const cookiePolicyURL = "https://www.theguardian.com/info/cookies";

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

const topButtonContainerStyles = css`
  height: 66px;
  margin-left: -12px;
  margin-right: -12px;
  display: flex;
  padding: 6px 6px;
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
  flex: 1;
  margin: 0 6px;
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

interface IabVendor {
  id: number;
  name: string;
  policyUrl: string;
  purposeIds: number[];
  legIntPurposeIds: number[];
  featureIds: number[];
}

interface ParsedIabVendor {
  id: number;
  name: string;
  policyUrl: string;
  purposeIds: number[];
  legIntPurposeIds: number[];
  featureIds: number[];
  description: React.ReactNode;
}

interface IabVendorList {
  vendorListVersion: number;
  lastUpdated: string;
  purposes: IabPurpose[];
  features: IabFeature[];
  vendors: IabVendor[];
}

interface ParsedIabVendorList extends IabVendorList {
  vendors: ParsedIabVendor[];
}

export class PrivacySettings extends Component<{}, State> {
  private iabVendorList?: ParsedIabVendorList;

  constructor(props: {}) {
    super(props);

    this.state = { iabPurposes: {} };
  }

  public componentDidMount(): void {
    fetch(iabVendorListURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Vendor List not ok");
        }
      })
      .then(remoteVendorList => {
        this.buildState(this.parseVendorList(remoteVendorList));
      })
      .catch(error => {
        // tslint:disable-next-line: no-console
        console.log("ERROR:", error);
      });
    // TODO: get cookies here
  }

  public render(): React.ReactNode {
    return (
      <div css={containerStyles}>
        <h1 css={headerStyles}>We need to talk about data...</h1>

        <p>
          ...and how we use yours specifically. Please review and manage your
          privacy settings below.
        </p>
        <p>
          As part of our reader funded strategy, we use cookie identifiers and
          information about your interests to improve experiences and show
          personalised advertising.
        </p>
        <p>
          These technologies are provided by us and by our third-party partners.
          To find out more, read our{" "}
          <a href={privacyPolicyURL} target="_blank">
            privacy policy
          </a>{" "}
          and{" "}
          <a href={cookiePolicyURL} target="_blank">
            cookie policy
          </a>.
        </p>

        <form id="cmp-form">
          <div css={topButtonContainerStyles}>
            <button
              type="button"
              onClick={() => {
                this.doScrolling("#cmp-options", 250);
              }}
              css={css`
                ${buttonStyles};
              `}
            >
              Options
            </button>

            <button
              type="button"
              onClick={() => {
                this.enableAllAndClose();
              }}
              css={css`
                ${buttonStyles};
              `}
            >
              Enable all and close
            </button>
          </div>
          <div id="cmp-options">
            {this.renderPurposeItems()}
            <CmpSeparator />
            {this.renderVendorItems()}
            <CmpSeparator />
            {this.renderFeatureItems()}
            <CmpSeparator />
          </div>
          <p>
            You can change the above settings for this browser at any time by
            accessing the{" "}
            <a href={cookiePolicyURL} target="_blank">
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
              `}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                this.saveAndClose();
              }}
              css={css`
                ${buttonStyles};
              `}
            >
              Save and continue
            </button>
          </div>
        </form>
      </div>
    );
  }

  private doScrolling(query: string, duration: number): void {
    const element: HTMLElement | null = document.querySelector(query);
    if (!element) {
      return;
    }

    const elementY: number =
      window.pageYOffset + element.getBoundingClientRect().top;
    const startingY: number = window.pageYOffset;
    const diff: number = elementY - startingY;
    let start: number;

    const animationStep: FrameRequestCallback = timestamp => {
      if (!start) {
        start = timestamp;
      }
      // Elapsed milliseconds since start of scrolling.
      const time: number = timestamp - start;
      // Get percent of completion in range [0, 1].
      const percent: number = Math.min(time / duration, 1);

      window.scrollTo(0, startingY + diff * percent);

      // Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimationFrame(animationStep);
      }
    };

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(animationStep);
  }

  private buildState(iabVendorList: ParsedIabVendorList): void {
    // tslint:disable-next-line: no-object-mutation
    this.iabVendorList = iabVendorList;

    if (iabVendorList && iabVendorList.purposes) {
      const iabPurposes = iabVendorList.purposes.reduce((acc, purpose) => {
        return { ...acc, [purpose.id]: null };
      }, {});

      this.setState({ iabPurposes });
    }
  }

  private parseVendorList(iabVendorList: IabVendorList): ParsedIabVendorList {
    const vendors = iabVendorList.vendors.map(vendor => ({
      ...vendor,
      description: this.getVendorDescription(vendor, iabVendorList)
    }));

    return {
      ...iabVendorList,
      vendors
    };
  }

  private getVendorDescription(
    vendor: IabVendor,
    iabVendorList: IabVendorList
  ): React.ReactNode {
    const {
      name,
      policyUrl,
      purposeIds,
      legIntPurposeIds,
      featureIds
    } = vendor;

    return (
      <>
        <p>
          <a href={policyUrl}>{name}'s Privacy policy</a>
        </p>
        <p>
          Purpose(s):{" "}
          {this.getIabPurposesDescriptions(purposeIds, iabVendorList.purposes)}
        </p>
        <p>
          Legitimate interest(s):{" "}
          {this.getIabPurposesDescriptions(
            legIntPurposeIds,
            iabVendorList.purposes
          )}
        </p>
        <p>
          Feature(s):{" "}
          {this.getFeaturesDescriptions(featureIds, iabVendorList.features)}
        </p>
      </>
    );
  }

  private getIabPurposesDescriptions(
    ids: number[],
    purposes: IabPurpose[]
  ): string {
    const result = ids
      .reduce((acc, id) => {
        let str = "";

        const purpose = purposes.find(item => item.id === id);
        str = purpose ? purpose.name : "";

        if (str.length) {
          return acc + str + " | ";
        } else {
          // TODO: Throw error
          return acc;
        }
      }, "")
      .slice(0, -3);

    return result.length ? result : "None";
  }

  private getFeaturesDescriptions(
    ids: number[],
    features: IabFeature[]
  ): string {
    const result = ids
      .reduce((acc, id) => {
        let str = "";

        const feature = features.find(item => item.id === id);
        str = feature ? feature.name : "";

        if (str.length) {
          return acc + str + " | ";
        } else {
          // TODO: Throw error
          return acc;
        }
      }, "")
      .slice(0, -3);

    return result.length ? result : "None";
  }

  private renderPurposeItems(): React.ReactNode {
    if (!this.iabVendorList || !this.iabVendorList.purposes) {
      return "";
    }

    return this.iabVendorList.purposes.map(
      (purpose: IabPurpose, index: number): React.ReactNode => {
        const { id, name, description } = purpose;

        return (
          <CmpItem
            name={name}
            value={this.state.iabPurposes[id]}
            updateItem={(updatedValue: boolean) => {
              this.updatePurpose(id, updatedValue);
            }}
            key={`purpose-${id}`}
          >
            <p>{description}</p>
          </CmpItem>
        );
      }
    );
  }

  private renderVendorItems(): React.ReactNode {
    if (!this.iabVendorList || !this.iabVendorList.vendors) {
      return "";
    }

    return (
      <CmpCollapsible title="Vendors" key={`vendorsCollapsible`}>
        {this.iabVendorList.vendors.map(
          (vendor: ParsedIabVendor, index: number): React.ReactNode => {
            const { id, name, description } = vendor;

            return (
              <CmpItem name={name} key={`vendor-${id}`}>
                {description}
              </CmpItem>
            );
          }
        )}
      </CmpCollapsible>
    );
  }

  private renderFeatureItems(): React.ReactNode {
    if (!this.iabVendorList || !this.iabVendorList.features) {
      return "";
    }

    return (
      <CmpCollapsible title="Features" key={`featuresCollapsible`}>
        {this.iabVendorList.features.map(
          (feature: IabFeature, index: number): React.ReactNode => {
            const { id, name, description } = feature;
            return (
              <CmpItem name={name} key={`feature-${id}`}>
                <p>{description}</p>
              </CmpItem>
            );
          }
        )}
      </CmpCollapsible>
    );
  }

  private enableAllAndClose(): void {
    if (this.state.iabPurposes) {
      const iabPurposes = Object.keys(this.state.iabPurposes).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );

      this.saveAndClose({ iabPurposes });
    }
  }

  private saveAndClose(stateToSave?: State): void {
    this.saveSettings(stateToSave || this.state);

    // TODO: If save was successful and it's on a modal, close the modal
  }

  private saveSettings(stateToSave: State): boolean {
    if (!this.iabVendorList) {
      // TODO: Trigger error
      // tslint:disable-next-line: no-console
      console.log("ERROR: IAB vendor list not present.");
      return false;
    }

    const nullCount: number = Object.keys(stateToSave.iabPurposes).filter(
      key => stateToSave.iabPurposes[parseInt(key, 10)] === null
    ).length;

    if (nullCount > 0) {
      // tslint:disable-next-line: no-console
      console.log("ERROR: Missing answers");
      return false;
    }

    const allowedPurposes = Object.keys(stateToSave.iabPurposes)
      .filter(key => stateToSave.iabPurposes[parseInt(key, 10)])
      .map(purpose => parseInt(purpose, 10));
    const allowedVendors = this.iabVendorList.vendors.map(vendor => vendor.id);

    const consentData = new ConsentString();
    consentData.setGlobalVendorList(this.iabVendorList);
    consentData.setCmpId(CMP_ID);
    consentData.setCmpVersion(CMP_VERSION);
    consentData.setConsentScreen(CONSENT_SCREEN);
    consentData.setConsentLanguage(CONSENT_LANGUAGE);
    consentData.setPurposesAllowed(allowedPurposes);
    consentData.setVendorsAllowed(allowedVendors);

    writeVendorConsentCookie(consentData.getConsentString());

    // tslint:disable-next-line: no-console
    console.log("[IAB] Consent String is:", consentData.getConsentString());

    return true;
  }

  private updatePurpose(purposeId: number, value: boolean): void {
    this.setState((prevState, props) => ({
      iabPurposes: {
        ...prevState.iabPurposes,
        [purposeId]: value
      }
    }));
  }
}
