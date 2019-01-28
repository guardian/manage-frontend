import { Location } from "@reach/router";
import React, { ReactNode } from "react";
import parse from "url-parse";

declare global {
  interface Window {
    ga?: any;
    gaData?: any;
    dataLayer?: any;
  }
}

export interface Event {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
}

export const trackEvent = ({
  eventCategory,
  eventAction,
  eventLabel,
  eventValue
}: Event) => {
  if (window.ga) {
    window.ga(
      "send",
      "event",
      eventCategory,
      eventAction,
      eventLabel,
      eventValue
    );
  }
  if (window.guardian && window.guardian.ophan) {
    const actionSuffix =
      window.guardian && window.guardian.INTCMP
        ? ` | ${window.guardian.INTCMP}`
        : "";
    window.guardian.ophan.record({
      componentEvent: {
        component: `MMA_${eventCategory.toUpperCase()}`,
        action: `MMA_${eventAction.toUpperCase()}${actionSuffix}`,
        value: eventLabel
      }
    });
  }
};

export const applyAnyOptimiseExperiments = () => {
  if (typeof window !== "undefined" && window.ga && window.dataLayer) {
    window.dataLayer.push({ event: "optimize.activate" });
  }
};

export class AnalyticsTracker extends React.PureComponent<{}> {
  public readonly INTCMP?: string;

  constructor(props: {}) {
    super(props);
    if (typeof window !== "undefined" && window.ga) {
      this.INTCMP = parse(window.location.href, true).query.INTCMP;

      if (window.guardian) {
        // tslint:disable-next-line:no-object-mutation
        window.guardian.INTCMP = this.INTCMP;
      }

      if (window.dataLayer === undefined) {
        window.dataLayer = [];
      }

      window.ga("create", "UA-51507017-5", "auto");
      window.ga("require", "GTM-M985W29");
      window.ga("set", "transport", "beacon");
      if (this.INTCMP) {
        window.ga("set", "dimension12", this.INTCMP);
      }

      new MutationObserver(applyAnyOptimiseExperiments).observe(document.body, {
        attributes: false,
        characterData: false,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false
      });
    }
  }

  public render(): ReactNode {
    return (
      <Location>
        {({ location }) => {
          if (location && typeof window !== "undefined") {
            if (
              window.guardian &&
              window.guardian.ophan &&
              window.guardian.ophan.sendInitialEvent
            ) {
              if (window.guardian.spaTransition) {
                window.guardian.ophan.sendInitialEvent(location.href);
              } else {
                // tslint:disable-next-line:no-object-mutation
                window.guardian.spaTransition = true;
              }
            }
            if (window.ga) {
              window.ga("send", "pageview", {
                location: location.href,
                page: location.pathname + location.search,
                dimension12: this.INTCMP
              });
              // TODO add ophan pageViewId as a GA dimension
              applyAnyOptimiseExperiments();
              // tslint:disable-next-line:no-object-mutation
              document.body.scrollTop = 0; // For Safari
              // tslint:disable-next-line:no-object-mutation
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            }
          }
          return null; // null is a valid React node type, but void is not.
        }}
      </Location>
    );
  }
}
