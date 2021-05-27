import { Location } from "@reach/router";
import React from "react";
import { DEFAULT_PAGE_TITLE } from "../../../shared/helpCentreConfig";

interface PageTitleProps {
  title?: string | undefined;
}

export const PageTitle = (props: PageTitleProps) => (
  <Location>
    {({ location }) => {
      if (location && document) {
        const pageTitle =
          DEFAULT_PAGE_TITLE + (props.title ? " | " + props.title : "");
        if (document.title !== pageTitle) {
          // tslint:disable-next-line:no-object-mutation
          document.title = pageTitle;
        }
      }
      return null;
    }}
  </Location>
);
