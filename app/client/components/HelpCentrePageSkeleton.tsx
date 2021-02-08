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

const nonMMALocationObjectArr: LocationObject[] = [
  {
    title: "Help Centre",
    path: "/help-centre"
  },
  {
    title: "Need to contact us about something?",
    path: "/help-centre/contact-us"
  }
];

const MMAPageSkeleton = () => (
  <Location>
    {({ location }) => {
      const selectedNonMMALocationObject = nonMMALocationObjectArr.filter(
        currentObject => location.pathname.startsWith(currentObject.path)
      )[0];

      if (selectedNonMMALocationObject) {
        return (
          <>
            <SectionHeader title={selectedNonMMALocationObject.title} />
            <SectionPageContainer sectionTitle="&nbsp;">
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

export default MMAPageSkeleton;
