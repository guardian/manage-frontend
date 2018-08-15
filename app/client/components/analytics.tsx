import { Location } from "@reach/router";
import React, { ReactNode } from "react";

declare global {
  interface Window {
    ga?: any;
    gaData?: any;
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
};

export class AnalyticsTracker extends React.PureComponent<{}> {
  constructor(props: {}) {
    super(props);
    if (window.ga) {
      window.ga("create", "UA-51507017-5", "auto");
      window.ga("require", "GTM-NZGXNBL");
      window.ga("set", "transport", "beacon");
    }
  }

  public render(): ReactNode {
    return (
      <Location>
        {({ location }) => {
          if (location && location.pathname && window.ga) {
            window.ga("send", "pageview", location.pathname);
          }
          return null; // null is a valid React node type, but void is not.
        }}
      </Location>
    );
  }
}
