import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { Location } from "@reach/router";
import React from "react";
import { SectionHeader } from "./sectionHeader";
import { SectionPageContainer } from "./sectionPageContainer";
import { Spinner } from "./spinner";
import { WithStandardTopMargin } from "./WithStandardTopMargin";

interface LocationObject {
  title: string;
  path: string;
}

const helpCentreLocationObjectArr: LocationObject[] = [
  {
    title: "How can we help you?",
    path: "/help-centre"
  },
  {
    title: "Need to contact us?",
    path: "/help-centre/contact-us"
  }
];

const HelpCentrePageSkeleton = () => (
  <Location>
    {({ location }) => {
      const selectedhelpCentreLocationObject = helpCentreLocationObjectArr.filter(
        currentObject =>
          location.pathname === currentObject.path ||
          location.pathname === currentObject.path + "/"
      )[0];

      if (selectedhelpCentreLocationObject) {
        return (
          <>
            <SectionHeader title={selectedhelpCentreLocationObject.title} />
            <SectionPageContainer>
              <div
                css={css`
                  margin-bottom: ${space[24]}px;
                `}
              >
                <WithStandardTopMargin>
                  <Spinner />
                </WithStandardTopMargin>
                <div style={{ height: "50vh" }} />
              </div>
            </SectionPageContainer>
          </>
        );
      }
    }}
  </Location>
);

export default HelpCentrePageSkeleton;
