declare global {
  interface Window {
    dataLayer?: any[][];
  }
}

// tslint:disable-next-line:no-object-mutation

export const gtag = (...args: any[]) => {
  // tslint:disable-next-line:no-object-mutation
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push(args);
};

gtag("config", "UA-51507017-5");

export const trackPath = ((previous = "") => (path: string) => {
  if (path !== previous) {
    gtag("config", "UA-51507017-5", { page_path: path });
  }
})();
