import { Location } from "@reach/router";

const exceptions: string[] = ["/help-centre/contact-us/"];

export const ScrollToTop = () => (
  <Location>
    {({ location }) => {
      if (location && document) {
        if (shouldScrollToTop(location.pathname)) {
          // tslint:disable-next-line:no-object-mutation
          document.body.scrollTop = 0; // For Safari
          // tslint:disable-next-line:no-object-mutation
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
      }
      return null;
    }}
  </Location>
);

const shouldScrollToTop = (path: string) =>
  !exceptions.some((exception) => path.startsWith(exception));
