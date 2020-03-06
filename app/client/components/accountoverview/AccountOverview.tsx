import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { maxWidth } from "../../styles/breakpoints";
import { navLinks } from "../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../page";

export const AccountOverview = (props: RouteComponentProps) => (
  <>
    <PageHeaderContainer selectedNavItem={navLinks.accountOverview}>
      <h1
        css={css`
          ${headline.large()};
          font-size: "32px",
          lineheight: "36px",
          margin-bottom: "30px",
          margin-top: "0"
          `}
      >
        Account overview
      </h1>
    </PageHeaderContainer>
    <PageNavAndContentContainer selectedNavItem={navLinks.accountOverview}>
      <h2
        css={css`
          margin-top: 50px;
          border-top: 1px solid ${palette.neutral["86"]};
          ${headline.small()};
          font-weight: bold;
          ${maxWidth.tablet} {
            font-size: 1.25rem;
            line-height: 1.6;
          }
        `}
      >
        Welcome to your Guardian account
      </h2>
    </PageNavAndContentContainer>
  </>
);
