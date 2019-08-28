import { css } from "@emotion/core";
import { ConsentString } from "consent-string";
import Raven from "raven-js";
import React, { Component } from "react";
import palette from "../../colours";
import { CmpCollapsible } from "./CmpCollapsible";
import { CmpItem } from "./CmpItem";
import { CmpSeparator } from "./CmpSeparator";
import {
  readGuCookie,
  readIabCookie,
  writeGuCookie,
  writeIabCookie
} from "./cookie";

const CMP_ID = 112;
const CMP_VERSION = 1;
const CONSENT_SCREEN = 0;
const CONSENT_LANGUAGE = "en";
const CMP_READY_MSG = "readyCmp";
const CMP_CLOSE_MSG = "closeCmp";
const CMP_SAVED_MSG = "savedCmp";

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

const integStyles = css`
  margin-right: 5px;
  border: none;
  border-radius: 15px;
  padding: 5px 10px;
  background-color: ${palette.neutral[6]};
`;

const cleanGuPurposeList: GuPurposeList = {
  purposes: [
    {
      id: 0,
      name: "Essential",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      integrations: [
        {
          name: "Ophan",
          policyUrl: "https://www.theguardian.com/info/privacy"
        },
        {
          name: "Confiant",
          policyUrl: "https://www.confiant.com/privacy"
        }
      ],
      hideRadio: true
    },
    {
      id: 1,
      name: "Functional",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis malesuada ante.",
      integrations: [
        {
          name: "Pinterest",
          policyUrl: "https://policy.pinterest.com/"
        }
      ]
    },
    {
      id: 2,
      name: "Performance",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis malesuada ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      integrations: [
        {
          name: "Sentry",
          policyUrl: "https://sentry.io/privacy/"
        },
        {
          name: "Google Analytics",
          policyUrl: "https://policies.google.com/privacy?hl=en-US"
        }
      ]
    }
  ]
};

interface State {
  guPurposes: GuPurposeState;
  iabPurposes: IabPurposeState;
}

export class PrivacySettings extends Component<{}, State> {
  private guPurposeList?: ParsedGuPurposeList;
  private iabVendorList?: ParsedIabVendorList;

  constructor(props: {}) {
    super(props);

    this.state = { guPurposes: {}, iabPurposes: {} };
  }

  public componentDidMount(): void {
    fetch(iabVendorListURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`${response.status} | ${response.statusText}`);
        }
      })
      .then(remoteVendorList => {
        return this.buildState(
          parseGuPurposeList(cleanGuPurposeList),
          parseIabVendorList(remoteVendorList)
        );
      })
      .then(() => {
        window.parent.postMessage(CMP_READY_MSG, "*");
      })
      .catch(error => {
        Raven.captureException(`error fetching CMP Vendor List: ${error}`, {
          tags: { feature: "CMP" }
        });
      });
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
          information about your interests such as how many times you visited
          our website and which articles you've read to improve experiences and
          show personalised advertising.
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
                doScrolling("#cmp-options", 250);
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
            <CmpSeparator />
            {this.renderGuPurposeItems()}
            {this.renderIabPurposeItems()}
            <CmpSeparator />
            {this.renderVendorItems()}
            <CmpSeparator />
            {this.renderFeatureItems()}
            <CmpSeparator />
          </div>
          <p>
            You can change the above settings for this browser at any time by
            navigating to the Privacy Settings from the main page.
          </p>
          <div css={buttonContainerStyles}>
            <button
              type="button"
              onClick={() => {
                close();
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

  private buildState(
    guPurposeList: ParsedGuPurposeList,
    iabVendorList: ParsedIabVendorList
  ): Promise<void> {
    // tslint:disable-next-line: no-object-mutation
    this.guPurposeList = guPurposeList;
    // tslint:disable-next-line: no-object-mutation
    this.iabVendorList = iabVendorList;

    const guPurposes =
      readGuCookie() ||
      guPurposeList.purposes.reduce((acc, purpose) => {
        return {
          ...acc,
          [purpose.id]: !purpose.id ? true : null
        };
      }, {});

    const iabStr = readIabCookie();

    let iabPurposes = {};
    if (iabStr) {
      const iabData = new ConsentString(iabStr);
      iabPurposes = iabVendorList.purposes.reduce((acc, purpose) => {
        return { ...acc, [purpose.id]: iabData.isPurposeAllowed(purpose.id) };
      }, {});
    } else {
      iabPurposes = iabVendorList.purposes.reduce((acc, purpose) => {
        return { ...acc, [purpose.id]: null };
      }, {});
    }

    return new Promise(resolve =>
      this.setState({ guPurposes, iabPurposes }, () => resolve())
    );
  }

  private renderGuPurposeItems(): React.ReactNode {
    if (!this.guPurposeList || !this.guPurposeList.purposes) {
      return "";
    }

    return this.guPurposeList.purposes.map(
      (purpose: ParsedGuPurpose): React.ReactNode => {
        const { id, name, description, integDescription, hideRadio } = purpose;

        const optProps = hideRadio
          ? {}
          : {
              value: this.state.guPurposes[id],
              updateItem: (updatedValue: boolean) => {
                this.updateGuPurpose(id, updatedValue);
              }
            };

        return (
          <CmpItem name={name} {...optProps} key={`purpose-${id}`}>
            <p>{description}</p>
            <p>{integDescription}</p>
          </CmpItem>
        );
      }
    );
  }

  private renderIabPurposeItems(): React.ReactNode {
    if (!this.iabVendorList || !this.iabVendorList.purposes) {
      return "";
    }

    return this.iabVendorList.purposes.map(
      (purpose: IabPurpose): React.ReactNode => {
        const { id, name, description } = purpose;

        return (
          <CmpItem
            name={name}
            value={this.state.iabPurposes[id]}
            updateItem={(updatedValue: boolean) => {
              this.updateIabPurpose(id, updatedValue);
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
    const guPurposes = Object.keys(this.state.guPurposes).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );

    const iabPurposes = Object.keys(this.state.iabPurposes).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );

    this.saveAndClose({ guPurposes, iabPurposes });
  }

  private saveAndClose(stateToSave?: State): void {
    if (this.saveSettings(stateToSave || this.state)) {
      close();
    }
  }

  private saveSettings(stateToSave: State): boolean {
    if (!this.iabVendorList) {
      return false;
    }

    const guNullCount: number = Object.keys(stateToSave.guPurposes).filter(
      key => stateToSave.guPurposes[parseInt(key, 10)] === null
    ).length;

    const iabNullCount: number = Object.keys(stateToSave.iabPurposes).filter(
      key => stateToSave.iabPurposes[parseInt(key, 10)] === null
    ).length;

    if (guNullCount + iabNullCount > 0) {
      // TODO: Show validation error as no nulls are allowed.
      return false;
    }

    writeGuCookie(stateToSave.guPurposes);

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

    writeIabCookie(consentData.getConsentString());

    // Notify parent that consent has been saved
    window.parent.postMessage(CMP_SAVED_MSG, "*");

    return true;
  }

  private updateGuPurpose(purposeId: number, value: boolean): void {
    this.setState((prevState, props) => ({
      guPurposes: {
        ...prevState.guPurposes,
        [purposeId]: value
      },
      iabPurposes: {
        ...prevState.iabPurposes
      }
    }));
  }

  private updateIabPurpose(purposeId: number, value: boolean): void {
    this.setState((prevState, props) => ({
      guPurposes: {
        ...prevState.guPurposes
      },
      iabPurposes: {
        ...prevState.iabPurposes,
        [purposeId]: value
      }
    }));
  }
}

const parseGuPurposeList = (
  guPurposeList: GuPurposeList
): ParsedGuPurposeList => {
  const purposes = guPurposeList.purposes.map(purpose => ({
    ...purpose,
    integDescription: getGuIntegrationDescription(purpose.integrations)
  }));

  return {
    purposes
  };
};

const parseIabVendorList = (
  iabVendorList: IabVendorList
): ParsedIabVendorList => {
  const vendors = iabVendorList.vendors.map(vendor => ({
    ...vendor,
    description: getVendorDescription(vendor, iabVendorList)
  }));

  return {
    ...iabVendorList,
    vendors
  };
};

const getGuIntegrationDescription = (
  integrations: GuIntegration[]
): React.ReactNode => {
  return integrations.map(integration => {
    const { name, policyUrl } = integration;
    return (
      <a href={policyUrl} key={name} css={integStyles}>
        {name}
      </a>
    );
  });
};

const getVendorDescription = (
  vendor: IabVendor,
  iabVendorList: IabVendorList
): React.ReactNode => {
  const { name, policyUrl, purposeIds, legIntPurposeIds, featureIds } = vendor;

  return (
    <>
      <p>
        <a href={policyUrl}>{name}'s Privacy policy</a>
      </p>
      <p>
        Consent purpose(s):{" "}
        {getIabPurposesDescriptions(purposeIds, iabVendorList.purposes)}
      </p>
      <p>
        Legitimate interest purpose(s):{" "}
        {getIabPurposesDescriptions(legIntPurposeIds, iabVendorList.purposes)}
      </p>
      <p>
        Feature(s):{" "}
        {getFeaturesDescriptions(featureIds, iabVendorList.features)}
      </p>
    </>
  );
};

const getIabPurposesDescriptions = (
  ids: number[],
  purposes: IabPurpose[]
): string => {
  const result = ids
    .reduce((acc, id) => {
      let str = "";

      const purpose = purposes.find(item => item.id === id);
      str = purpose ? purpose.name : "";

      if (str.length) {
        return acc + str + " | ";
      } else {
        return acc;
      }
    }, "")
    .slice(0, -3);

  return result.length ? result : "None";
};

const getFeaturesDescriptions = (
  ids: number[],
  features: IabFeature[]
): string => {
  const result = ids
    .reduce((acc, id) => {
      let str = "";

      const feature = features.find(item => item.id === id);
      str = feature ? feature.name : "";

      if (str.length) {
        return acc + str + " | ";
      } else {
        return acc;
      }
    }, "")
    .slice(0, -3);

  return result.length ? result : "None";
};

const close = () => {
  window.parent.postMessage(CMP_CLOSE_MSG, "*");
};

const doScrolling = (query: string, duration: number): void => {
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
};
