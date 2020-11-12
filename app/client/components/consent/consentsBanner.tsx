import { init as initCMP } from "@guardian/consent-management-platform";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import palette from "../../colours";
import { getCookie } from "../../cookies";
import { isInUSA } from "../../geolocation";
import { maxWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import { trackEventInOphanOnly } from "../analytics";
import { Button } from "../buttons";
import { Roundel } from "../svgs/roundel";

const CONSENT_COOKIE_NAME = "GU_TK";
const CONSENT_COOKIE_DAYS_TO_LIVE = 30 * 18;

const CONSENTS_BANNER_OPHAN_EVENT_CATEGORY = "consents_banner";

const documentIsAvailable = typeof document !== "undefined" && document;

const requiresConsents = () => !getCookie(CONSENT_COOKIE_NAME);

interface ConsentsBannerState {
  useCCPA: boolean;
  requiresConsents: boolean;
}

export class ConsentsBanner extends React.Component<
  RouteComponentProps,
  ConsentsBannerState
> {
  public state = {
    useCCPA: false,
    requiresConsents: false
  };

  private bannerRef = React.createRef<HTMLDivElement>();

  public componentDidMount = () => {
    if (isInUSA()) {
      initCMP({ useCcpa: true });
      this.setState({ useCCPA: true });
    } else {
      this.updateStateWithConsents();
    }
  };

  public render = () => {
    // tslint:disable-next-line:no-shadowed-variable
    const { useCCPA, requiresConsents } = this.state;

    return documentIsAvailable && !useCCPA && requiresConsents ? (
      <div
        ref={this.bannerRef}
        tabIndex={-1}
        css={{
          zIndex: 99,
          position: "fixed",
          bottom: 0,
          width: "100%",
          padding: ".375rem 0 1.5rem",
          background: palette.neutral["2"],
          color: palette.white
        }}
      >
        {trackEventInOphanOnly({
          eventCategory: CONSENTS_BANNER_OPHAN_EVENT_CATEGORY,
          eventAction: "impression"
        })}
        <div
          css={{
            margin: "0 auto",
            maxWidth: 980
          }}
        >
          <div
            css={{
              maxWidth: "620px",
              fontSize: "17px",
              position: "relative",
              a: {
                textDecoration: "underline",
                color: palette.white,
                ":visited": { color: palette.white }
              }
            }}
          >
            <div
              css={{
                position: "absolute",
                left: "-80px",
                [maxWidth.leftCol]: {
                  display: "none"
                }
              }}
            >
              <Roundel
                size={36}
                fillG={palette.neutral["2"]}
                fillMain={palette.white}
              />
            </div>
            <h2 css={{ margin: 0, fontWeight: 700 }}>Your privacy</h2>
            <p>
              We use cookies to improve your experience on our site and to show
              you personalised advertising.
            </p>
            <p>
              To find out more, read our{" "}
              <a href="https://www.theguardian.com/help/privacy-policy">
                privacy policy
              </a>
              {" and "}
              <a href="https://www.theguardian.com/info/cookies">
                cookie policy
              </a>
              .
            </p>
            <Button
              text="I'm OK with that"
              onClick={() => {
                this.writeConsents();
                trackEventInOphanOnly({
                  eventCategory: CONSENTS_BANNER_OPHAN_EVENT_CATEGORY,
                  eventAction: "click",
                  eventLabel: "im_ok_with_that"
                });
              }}
              hoverColour={palette.yellow.dark}
              fontWeight="bold"
              leftTick
              primary
            />
            <a
              href="https://profile.theguardian.com/privacy-settings"
              css={{ marginLeft: "10px", fontWeight: "bold", fontFamily: sans }}
              onClick={() =>
                trackEventInOphanOnly({
                  eventCategory: CONSENTS_BANNER_OPHAN_EVENT_CATEGORY,
                  eventAction: "click",
                  eventLabel: "my_options"
                })
              }
            >
              My options
            </a>
          </div>
        </div>
      </div>
    ) : null;
  };

  private updateStateWithConsents = () =>
    this.setState({ requiresConsents: requiresConsents() }, this.focusBanner);

  private writeConsents = () => {
    const newGuTkCookieValue = `1.${Date.now()}`;

    const expires = new Date();
    expires.setDate(expires.getDate() + CONSENT_COOKIE_DAYS_TO_LIVE);

    // tslint:disable-next-line:no-object-mutation
    document.cookie =
      `${CONSENT_COOKIE_NAME}=${newGuTkCookieValue}; path=/; secure;` +
      `expires=${expires.toUTCString()};domain=.${window.guardian.domain}`;

    this.updateStateWithConsents();
  };

  private focusBanner = () => {
    // tslint:disable-next-line:no-shadowed-variable
    const { useCCPA, requiresConsents } = this.state;

    if (documentIsAvailable && !useCCPA && requiresConsents) {
      this.bannerRef.current?.focus();
    }
  };
}

export const SuppressConsentBanner = (_: RouteComponentProps) => null;
