let GA_QUEUE: string[] = [];

/// <reference types="google.analytics" />
// switch this to a file reference when we need to use a specific tracker.

/* tslint:disable:no-string-literal */
/* tslint:disable:semicolon */
/* tslint:disable:no-unused-expression */
/* tslint:disable:no-object-mutation */
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-parameter-reassignment */

/* tslint:disable:typedef */

// This code is from Google
(function(i, s, o, g, r) {
  let a: any;
  let m: any;
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function() {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * (new Date() as any));
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window as { [key: string]: any },
  document,
  "script",
  "https://www.google-analytics.com/analytics.js",
  "ga"
);
window.ga = console.log;
/* tslint:enable:no-unused-expression */
/* tslint:enable:semicolon */
/* tslint:enable:no-string-literal */
/* tslint:enable:no-object-mutation */
/* tslint:enable:only-arrow-functions */
/* tslint:enable:no-parameter-reassignment */

/* tslint:enable:typedef */

const flushQueue = () => {
  const ga = (window as {
    ga?: UniversalAnalytics.ga;
  }).ga;

  if (ga === undefined) {
    return;
  }
  const queue = GA_QUEUE;
  GA_QUEUE = [];
  queue.map(page => ga("send", "pageview", page));
};

export const trackPath = ((previous = "") => (path: string) => {
  if (path !== previous) {
    // tslint:disable-next-line:no-parameter-reassignment
    previous = path;
    GA_QUEUE.push(path);
    flushQueue();
  }
})();
