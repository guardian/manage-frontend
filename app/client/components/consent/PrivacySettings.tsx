import { css } from "@emotion/core";
import { cmpConfig, cmpCookie } from "@guardian/consent-management-platform";
import {
  GuIntegration,
  GuPurpose,
  GuPurposeList,
  GuPurposeState,
  IabFeature,
  IabPurpose,
  IabPurposeState,
  IabVendor,
  IabVendorList
} from "@guardian/consent-management-platform/lib/types";
import {
  focusHalo,
  palette,
  size,
  space,
  transitions
} from "@guardian/src-foundations";
import { ConsentString } from "consent-string";
import Raven from "raven-js";
import React, { Component } from "react";
import { conf } from "../../../server/config";
import { minWidth } from "../../styles/breakpoints";
import { ArrowIcon } from "../svgs/arrowIcon";
import { CmpItem } from "./CmpItem";

const CONTAINER_ID = "container";
const PURPOSES_ID = "purposes";
const SCROLLABLE_ID = "scrollable";

let domain: string;

if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

const isProd = domain === "theguardian.com";
const privacyPolicyURL = "https://www.theguardian.com/info/privacy";
const cookiePolicyURL = "https://www.theguardian.com/info/cookies";
const smallSpace = space[2]; // 12px
const mediumSpace = smallSpace + smallSpace / 3; // 16px

const containerStyles = css`
  z-index: 0;
  background-color: ${palette.brand.dark};
  color: ${palette.neutral[100]};
  width: 100%;
  ${minWidth.mobileLandscape} {
    width: 95%;
    max-width: 450px;
  }
  margin-top: 73px;
  ${minWidth.mobileLandscape} {
    margin-top: 108px;
  }
`;

const content = css`
  padding: ${smallSpace}px ${smallSpace}px 0 ${smallSpace}px;

  ${minWidth.mobileLandscape} {
    padding: ${smallSpace}px ${mediumSpace}px 0 ${mediumSpace}px;
  }

  h1 {
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    font-family: "Guardian Egyptian Web", Georgia, serif;
    margin-bottom: 12px;
  }

  p {
    margin-bottom: 16px;
    font-size: 17px;
    line-height: 24px;
    font-family: "Guardian Text Egyptian Web", Georgia, serif;
  }

  a,
  a:visited {
    color: ${palette.neutral[100]};
  }

  ::after {
    margin-left: ${-smallSpace}px;
    margin-right: ${-smallSpace}px;
    ${minWidth.mobileLandscape} {
      margin-left: ${-mediumSpace}px;
      margin-right: ${-mediumSpace}px;
    }
    content: "";
    background-image: repeating-linear-gradient(
      to bottom,
      ${palette.brand.pastel},
      ${palette.brand.pastel} 1px,
      transparent 1px,
      transparent 4px
    );
    background-repeat: repeat-x;
    background-position: bottom;
    background-size: 1px 13px;
    background-color: ${palette.brand.dark};
    content: "";
    clear: left;
    display: block;
    height: 13px;
  }
`;

const buttonContainerStyles = css`
  border-top: 1px solid ${palette.brand.pastel};
  position: sticky;
  bottom: 0;
  padding: 12px;
  background: rgba(4, 31, 74, 0.8);
  z-index: 100;
`;

const topButtonContainerStyles = css`
  margin-left: ${-smallSpace}px;
  margin-right: ${-smallSpace}px;
  ${minWidth.mobileLarge} {
    border-top: 0;
    margin-bottom: 24px;
    margin-left: 0;
    margin-right: 0;
    padding: 0;
  }
`;

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  text-decoration: none;
  font-size: 16px;
  line-height: 22px;
  font-family: "Guardian Text Sans Web", Helvetica Neue, Helvetica, Arial,
    Lucida Grande, sans-serif;
  font-weight: 700;
  box-sizing: border-box;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: ${transitions.medium};
  &:focus {
    ${focusHalo};
    outline: none;
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  height: ${size.large}px;
  min-height: ${size.large}px;
  padding: 0 ${size.small / 2}px;
  ${minWidth.mobileMedium} {
    padding: 0 ${size.medium / 2}px;
  }
  ${minWidth.mobileLandscape} {
    padding: 0 ${size.large / 2}px;
  }
  border-radius: ${size.large / 2}px;
  svg {
    flex: 0 0 auto;
    display: block;
    fill: currentColor;
    position: relative;
    width: ${size.large}px;
    height: auto;
    margin: 0 ${-size.large / 3}px 0 ${size.large / 16}px;
  }
`;

const yellowButtonStyles = css`
  background-color: ${palette.yellow.main};
  color: ${palette.neutral[7]};

  &:hover :not(:disabled) {
    background-color: ${palette.yellow.dark};
  }
`;

const blueButtonStyles = css`
  background-color: ${palette.brand.dark};
  color: ${palette.neutral[100]};
  border: 1px solid ${palette.neutral[100]};
  margin-right: 8px;
  ${minWidth.mobileLandscape} {
    margin-right: 12px;
  }
  &:hover :not(:disabled) {
    background-color: ${palette.sport.bright};
  }
`;

const integStyles = css`
  font-weight: 700;
  font-size: 17px;
  line-height: 24px;
  font-family: "Guardian Text Sans Web", Helvetica Neue, Helvetica, Arial,
    Lucida Grande, sans-serif;
`;

const purposesContainerStyles = css`
  margin-left: -${smallSpace}px;
  margin-right: -${smallSpace}px;
  ${minWidth.mobileLandscape} {
    margin-left: -${mediumSpace}px;
    margin-right: -${mediumSpace}px;
  }
`;

const bottomButtonContainerStyles = css`
  padding: ${smallSpace / 2}px ${smallSpace}px ${smallSpace}px ${smallSpace}px;
  margin-bottom: 12px;
  ${minWidth.mobileLandscape} {
    padding: ${smallSpace / 2}px ${mediumSpace}px ${smallSpace}px
      ${mediumSpace}px;
  }
  p {
    font-size: 15px;
    line-height: 20px;
    font-family: "Guardian Text Egyptian Web", Georgia, serif;
    font-weight: 700;
  }
`;

const validationErrorStyles = css`
  display: block;
  background-color: ${palette.news.bright};
  padding: ${smallSpace / 2}px ${smallSpace}px;
  ${minWidth.mobileLandscape} {
    padding: ${mediumSpace / 2}px ${mediumSpace}px;
  }
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  display: block;
  p {
    font-size: 15px;
    line-height: 20px;
    font-family: "Guardian Text Egyptian Web", Georgia, serif;
    font-weight: 700;
    margin: 0;
  }
`;

interface ParsedGuPurposeList {
  purposes: ParsedGuPurpose[];
}

interface ParsedGuPurpose extends GuPurpose {
  integDescription: React.ReactNode;
}

interface ParsedIabVendorList extends IabVendorList {
  vendors: ParsedIabVendor[];
}

interface ParsedIabVendor extends IabVendor {
  description: React.ReactNode;
}

interface State {
  guPurposes: GuPurposeState;
  iabPurposes: IabPurposeState;
  iabNullResponses?: number[];
}

interface Props {
  updateHeaderWidth: (headerWidth: number) => void;
}

export class PrivacySettings extends Component<Props, State> {
  // private guPurposeList?: ParsedGuPurposeList;
  private iabVendorList?: ParsedIabVendorList;
  private rawVendorList?: IabVendorList;

  constructor(props: Props) {
    super(props);

    this.state = { guPurposes: {}, iabPurposes: {} };
  }

  public componentDidMount(): void {
    // Update header width to account for scrollbar on container
    this.updateHeaderWidth();

    window.addEventListener("resize", () => {
      // Update header width to on resize
      this.updateHeaderWidth();
    });

    fetch(cmpConfig.IAB_VENDOR_LIST_URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`${response.status} | ${response.statusText}`);
        }
      })
      .then(remoteVendorList => {
        // tslint:disable-next-line: no-object-mutation
        this.rawVendorList = remoteVendorList;

        return this.buildState(
          parseGuPurposeList(cmpConfig.GU_PURPOSE_LIST),
          parseIabVendorList(remoteVendorList)
        );
      })
      .then(() => {
        window.parent.postMessage({ msgType: cmpConfig.CMP_READY_MSG }, "*");
      })
      .catch(error => {
        Raven.captureException(`Error fetching CMP Vendor List: ${error}`, {
          tags: { feature: "CMP" }
        });
      });
  }

  public render(): React.ReactNode {
    const iabPurposesList = this.renderIabPurposeItems() as React.ReactNodeArray;
    const firstIabPurposeList = iabPurposesList.slice(0, 3);
    const secondIabPurposeList = iabPurposesList.slice(3);
    const { iabNullResponses } = this.state;

    return (
      <div id={CONTAINER_ID} css={containerStyles}>
        <div
          css={css`
            ${minWidth.mobileLandscape} {
              border-right: 1px solid ${palette.brand.pastel};
            }
          `}
        >
          <img
            src="/static/images/consent-graphic.png"
            css={css`
              width: 100%;
            `}
          />
          <div css={content}>
            <form id="cmp-form">
              <h1>
                Please review and manage your data and privacy settings below.
              </h1>
              <p>
                When you visit this site, we'd like to use cookies and
                identifiers to understand things like which pages you've visited
                and how long you've spent with us. It helps us improve our
                service to you.{" "}
              </p>
              <p>
                Our advertising partners would like to do the same – so the
                adverts are more relevant, and we make more money to invest in
                Guardian journalism. By using this site, you agree to our{" "}
                <a href={privacyPolicyURL} target="_blank">
                  privacy
                </a>{" "}
                and{" "}
                <a href={cookiePolicyURL} target="_blank">
                  cookie
                </a>{" "}
                policies
              </p>
              <div
                css={css`
                  ${buttonContainerStyles};
                  ${topButtonContainerStyles};
                `}
              >
                <button
                  type="button"
                  onClick={() => {
                    scrollToPurposes();
                  }}
                  css={css`
                    ${buttonStyles};
                    ${blueButtonStyles};
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
                    ${yellowButtonStyles};
                  `}
                >
                  <span>Enable all and close</span>
                  <ArrowIcon />
                </button>
              </div>
              <div css={purposesContainerStyles} id={PURPOSES_ID}>
                <ul>{firstIabPurposeList && firstIabPurposeList}</ul>
                {/* 
                  renderIabPurposeItems, 
                  renderVendorItems and renderFeatureItems 
                  should be in single <ul> once renderGuPurposeItems 
                  is restored.
                */}
                <div>
                  <ul>
                    {secondIabPurposeList && secondIabPurposeList}
                    {this.renderVendorItems()}
                    {this.renderFeatureItems()}
                  </ul>
                  <div
                    css={css`
                      ${buttonContainerStyles};
                      ${bottomButtonContainerStyles};
                    `}
                  >
                    {!!(iabNullResponses && iabNullResponses.length) && (
                      <div role="alert" css={validationErrorStyles}>
                        <p>Please set all privacy options to continue.</p>
                      </div>
                    )}
                    <p>
                      You can change the above settings for this browser at any
                      time by accessing our{" "}
                      <a href={privacyPolicyURL} target="_blank">
                        privacy policy
                      </a>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        close();
                      }}
                      css={css`
                        ${buttonStyles};
                        ${blueButtonStyles};
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
                        ${yellowButtonStyles};
                      `}
                    >
                      <span>Save and continue</span>
                      <ArrowIcon />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  private buildState(
    guPurposeList: ParsedGuPurposeList,
    iabVendorList: ParsedIabVendorList
  ): Promise<void> {
    // tslint:disable-next-line: no-object-mutation
    // this.guPurposeList = guPurposeList;   // TODO: RESTORE ONCE PECR PURPOSES READY
    // tslint:disable-next-line: no-object-mutation
    this.iabVendorList = iabVendorList;

    const guPurposes =
      cmpCookie.readGuCookie() ||
      guPurposeList.purposes.reduce((acc, purpose) => {
        return {
          ...acc,
          [purpose.id]: !purpose.id ? true : null
        };
      }, {});

    const iabStr = cmpCookie.readIabCookie();

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

  // TODO: RESTORE ONCE PECR PURPOSES READY
  // private renderGuPurposeItems(): React.ReactNode {
  //   if (!this.guPurposeList || !this.guPurposeList.purposes) {
  //     return "";
  //   }

  //   return this.guPurposeList.purposes.map(
  //     (purpose: ParsedGuPurpose): React.ReactNode => {
  //       const {
  //         id,
  //         name,
  //         description,
  //         integDescription,
  //         alwaysEnabled
  //       } = purpose;

  //       const optProps = alwaysEnabled
  //         ? { value: this.state.guPurposes[id] }
  //         : {
  //             value: this.state.guPurposes[id],
  //             updateItem: (updatedValue: boolean) => {
  //               this.updateGuPurpose(id, updatedValue);
  //             }
  //           };

  //       return (
  //         <CmpItem name={name} {...optProps} key={`purpose-${id}`}>
  //           <p>{description}</p>
  //           {integDescription}
  //         </CmpItem>
  //       );
  //     }
  //   );
  // }

  private renderIabPurposeItems(): React.ReactNode {
    if (!this.iabVendorList || !this.iabVendorList.purposes) {
      return "";
    }

    return this.iabVendorList.purposes.map(
      (purpose: IabPurpose): React.ReactNode => {
        const { id, name, description } = purpose;
        const { iabPurposes, iabNullResponses } = this.state;

        return (
          <CmpItem
            name={name}
            value={iabPurposes[id]}
            updateItem={(updatedValue: boolean) => {
              this.updateIabPurpose(id, updatedValue);
            }}
            key={`purpose-${id}`}
            showError={iabNullResponses && iabNullResponses.includes(id)}
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
      <CmpItem name="Vendors" key={`vendorsCollapsible`}>
        <ul>
          {this.iabVendorList.vendors.map(
            (vendor: ParsedIabVendor, index: number): React.ReactNode => {
              const { id, name, description } = vendor;

              return (
                <CmpItem name={name} key={`vendor-${id}`} isNested={true}>
                  {description}
                </CmpItem>
              );
            }
          )}
        </ul>
      </CmpItem>
    );
  }

  private renderFeatureItems(): React.ReactNode {
    if (!this.iabVendorList || !this.iabVendorList.features) {
      return "";
    }

    return (
      <CmpItem name="Features" key={`featuresCollapsible`}>
        <ul>
          {this.iabVendorList.features.map(
            (feature: IabFeature, index: number): React.ReactNode => {
              const { id, name, description } = feature;
              return (
                <CmpItem name={name} key={`feature-${id}`} isNested={true}>
                  <p>{description}</p>
                </CmpItem>
              );
            }
          )}
        </ul>
      </CmpItem>
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

    // TODO: RESTORE ONCE PECR PURPOSES READY
    // const guNullResponses: number = Object.keys(stateToSave.guPurposes)
    //   .filter(key => stateToSave.guPurposes[parseInt(key, 10)] === null)
    //   .map(key => parseInt(key, 10));

    const iabNullResponses: number[] = Object.keys(stateToSave.iabPurposes)
      .filter(key => stateToSave.iabPurposes[parseInt(key, 10)] === null)
      .map(key => parseInt(key, 10));

    if (iabNullResponses.length > 0) {
      this.setState((prevState, props) => ({
        iabNullResponses
      }));

      return false;
    }

    // TODO: RESTORE ONCE PECR PURPOSES READY
    // cmpCookie.writeGuCookie(stateToSave.guPurposes);

    const allowedPurposes = Object.keys(stateToSave.iabPurposes)
      .filter(key => stateToSave.iabPurposes[parseInt(key, 10)])
      .map(purpose => parseInt(purpose, 10));

    const allowedVendors = this.iabVendorList.vendors.map(vendor => vendor.id);

    // Notify parent that consent has been saved
    window.parent.postMessage(
      {
        msgType: cmpConfig.CMP_SAVED_MSG,
        msgData: {
          isProd,
          allowedPurposes,
          allowedVendors,
          iabVendorList: this.rawVendorList,
          variant: "CmpUiIab-variant"
        }
      },
      "*"
    );

    return true;
  }

  // TODO: RESTORE ONCE PECR PURPOSES READY
  // private updateGuPurpose(purposeId: number, value: boolean): void {
  //   this.setState((prevState, props) => ({
  //     guPurposes: {
  //       ...prevState.guPurposes,
  //       [purposeId]: value
  //     },
  //     iabPurposes: {
  //       ...prevState.iabPurposes
  //     }
  //   }));
  // }

  private updateIabPurpose(purposeId: number, value: boolean): void {
    this.setState((prevState, props) => ({
      guPurposes: {
        ...prevState.guPurposes
      },
      iabPurposes: {
        ...prevState.iabPurposes,
        [purposeId]: value
      },
      iabNullResponses: prevState.iabNullResponses
        ? prevState.iabNullResponses.filter(
            iabNullResponse => iabNullResponse !== purposeId
          )
        : []
    }));
  }

  private updateHeaderWidth(): void {
    const containerElem = document.getElementById(CONTAINER_ID);

    if (containerElem) {
      const containerWidth = containerElem.offsetWidth;
      this.props.updateHeaderWidth(containerWidth);
    }
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
  if (integrations.length) {
    return (
      <ul
        css={css`
          padding-bottom: 16px;
        `}
      >
        {integrations.map(integration => {
          const { name, policyUrl } = integration;
          return (
            <li key={name}>
              <a href={policyUrl} key={name} css={integStyles} target="_blank">
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return "";
};

const getVendorDescription = (
  vendor: IabVendor,
  iabVendorList: IabVendorList
): React.ReactNode => {
  const { name, policyUrl, purposeIds, legIntPurposeIds, featureIds } = vendor;

  return (
    <>
      <p>
        <a href={policyUrl} target="_blank">
          {name}'s Privacy policy
        </a>
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
  window.parent.postMessage({ msgType: cmpConfig.CMP_CLOSE_MSG }, "*");
};

const scrollToPurposes = (): void => {
  const purposeElem: HTMLElement | null = document.getElementById(PURPOSES_ID);
  const scrollableElem: HTMLElement | null = document.getElementById(
    SCROLLABLE_ID
  );
  const containerElem: HTMLElement | null = document.getElementById(
    CONTAINER_ID
  );

  if (!purposeElem || !scrollableElem || !containerElem) {
    return;
  }

  const purposeElemOffsetTop = purposeElem.offsetTop;
  const scrollableElemOffsetTop = scrollableElem.offsetTop;
  const containerElemOffsetTop = containerElem.offsetTop;

  // scrollTop can return subpixel on hidpi resolutions so round up to integer
  const initDistanceScrolled = Math.ceil(scrollableElem.scrollTop);
  const scrollLength =
    purposeElemOffsetTop -
    scrollableElemOffsetTop -
    containerElemOffsetTop -
    initDistanceScrolled;

  const duration: number = 750;
  const startTime: number =
    "now" in window.performance ? performance.now() : new Date().getTime();

  const scroll = (): void => {
    const now: number =
      "now" in window.performance ? performance.now() : new Date().getTime();
    const time: number = Math.min(1, (now - startTime) / duration);
    const easing: number =
      time < 0.5
        ? 4 * time * time * time
        : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // easeInOutCubic
    const newScrollTop =
      Math.ceil(easing * scrollLength) + initDistanceScrolled;

    // tslint:disable-next-line: no-object-mutation
    scrollableElem.scrollTop = newScrollTop;

    // scrollTop can return subpixel on hidpi resolutions so round up to integer
    const intScrollTop = Math.ceil(scrollableElem.scrollTop);

    if (
      intScrollTop === scrollLength + initDistanceScrolled ||
      newScrollTop !== intScrollTop
    ) {
      return;
    }

    requestAnimationFrame(scroll);
  };

  if ("requestAnimationFrame" in window === false) {
    // tslint:disable-next-line: no-object-mutation
    scrollableElem.scrollTop = scrollLength;
    return;
  }

  scroll();
};
