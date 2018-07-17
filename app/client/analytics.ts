declare global {
  interface Window {
    ga?: any;
  }
}

const initGA = () => {
  const { ga } = window;
  ga("create", "UA-51507017-5", "auto");
  ga("set", "transport", "beacon");
  ga("send", "pageview");
  return ga;
};

const trackPath = ((previous = "") => (path: string) => {
  if (path !== previous) {
    window.ga("send", "pageview", path);
  }
})();

interface Event {
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
  window.ga(
    "send",
    "event",
    eventCategory,
    eventAction,
    eventLabel,
    eventValue
  );
};

export { initGA, trackPath, trackEvent };
