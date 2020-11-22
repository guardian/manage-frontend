import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { minWidth } from "../../styles/breakpoints";
import { SectionHeader } from "../sectionHeader";
import { SectionPageContainer } from "../sectionPageContainer";

interface HelpCentreProps extends RouteComponentProps {
  urlSuccess?: string;
}

export const HelpCentre = (_: HelpCentreProps) => (
  <>
    <SectionHeader title="Help Centre" />
    <SectionPageContainer>
      <div
        css={css`
          margin-bottom: ${space[24]}px;
        `}
      >
        <h1
          css={css`
            ${headline.xxsmall({ fontWeight: "bold" })};
            margin: 0;
            border-top: 1px solid ${palette.neutral[86]};
            ${minWidth.desktop} {
              font-size: 1.75rem;
              border-top: 0;
            }
          `}
        >
          Help Centre
        </h1>
        <p
          css={css`
            margin-top: ${space[5]}px;
            ${textSans.medium()};
          `}
        >
          Help center content
        </p>
      </div>
    </SectionPageContainer>
  </>
);
