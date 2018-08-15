import { Location } from "@reach/router";
import React, { ReactNode } from "react";

declare global {
  interface Window {
    ga?: any;
    gaData?: any;
  }
}

const initGA = () => {
  if (window.ga) {
    window.ga("create", "UA-51507017-5", "auto");
    window.ga("require", "GTM-NZGXNBL");
    window.ga("set", "transport", "beacon");
  }
};

const trackPath = (path: string) => {
  if (path && window.ga) {
    window.ga("send", "pageview", path);
  }
};

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

export class AnalyticsTrackPath extends React.PureComponent<{}> {
  constructor(props: {}) {
    super(props);
    initGA();
  }

  public render(): ReactNode {
    return (
      <Location>
        {({ location }) => {
          trackPath(location.pathname);
          return null; // null is a valid React node type, but void is not.
        }}
      </Location>
    );
  }
}
