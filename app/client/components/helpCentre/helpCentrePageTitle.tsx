import { Location } from "@reach/router";
import React from "react";

interface PageTitleProps {
  title?: string | undefined;
}

export const PageTitle = (props: PageTitleProps) => (
  <Location>
    {({ location }) => {
      if (location && document) {
        const pageTitle =
          defaultPageTitle + (props.title ? " | " + props.title : "");
        if (document.title !== pageTitle) {
          document.title = pageTitle;
        }
      }
      return null;
    }}
  </Location>
);

export const defaultPageTitle = "Help Centre | The Guardian";
