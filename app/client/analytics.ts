declare global {
  interface Window {
    ga?: any;
  }
}

const initGA = () => {
  if (window.ga) {
    const { ga } = window;
    ga("create", "UA-51507017-5", "auto");
    ga("require", "GTM-NZGXNBL");
    ga("set", "transport", "beacon");
    ga("send", "pageview");
    return ga;
  }
};

const trackPath = ((previous = "") => (path: string) => {
  if (path !== previous && window.ga) {
    window.ga("send", "pageview", path);
  }
})();

export interface Event {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
}

const trackEvent = ({
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

export { initGA, trackPath, trackEvent };
