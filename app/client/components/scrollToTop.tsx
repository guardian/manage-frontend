import { Location } from "@reach/router";
import React from "react";

export const ScrollToTop = () => (
  <Location>
    {({ location }) => {
      if (location && document) {
        // tslint:disable-next-line:no-object-mutation
        document.body.scrollTop = 0; // For Safari
        // tslint:disable-next-line:no-object-mutation
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
      return null;
    }}
  </Location>
);
