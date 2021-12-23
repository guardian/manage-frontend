import { Location } from "@reach/router";
import { DEFAULT_PAGE_TITLE } from "../../../shared/helpCentreConfig";

interface PageTitleProps {
  title?: string | undefined;
}

export const PageTitle = (props: PageTitleProps) => (
  <Location>
    {() => {
      if (document) {
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
