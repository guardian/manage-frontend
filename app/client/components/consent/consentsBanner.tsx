import { RouteComponentProps } from "@reach/router";
import React from "react";
import palette from "../../colours";
import { maxWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import { trackEventInOphanOnly } from "../analytics";
import { Button } from "../buttons";
import { PageContainer } from "../page";
import { Roundel } from "../svgs/roundel";

const CONSENT_COOKIE_NAME = "GU_TK";
const CONSENT_COOKIE_DAYS_TO_LIVE = 30 * 18;

const CONSENTS_BANNER_OPHAN_EVENT_CATEGORY = "consents_banner";

const documentIsAvailable = typeof document !== "undefined" && document;

const requiresConsents = () =>
  documentIsAvailable &&
  !document.cookie
    .split(";")
    .find(keyValue => keyValue.trim().startsWith(CONSENT_COOKIE_NAME + "="));

export interface ConsentsBannerState {
  requiresConsents: boolean;
}

export class ConsentsBanner extends React.Component<
  RouteComponentProps,
  ConsentsBannerState
> {
  public state = {
    requiresConsents: false
  };

  public componentDidMount = () => this.updateStateWithConsents();

  public render = () =>
    documentIsAvailable && this.state.requiresConsents ? (
      <div
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
        <PageContainer noVerticalMargin>
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
              </a>.
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
        </PageContainer>
      </div>
    ) : null;

  private updateStateWithConsents = () =>
    this.setState({ requiresConsents: requiresConsents() });

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
}

export const SuppressConsentBanner = (props: RouteComponentProps) => null;
