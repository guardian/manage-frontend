import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { neutral } from "@guardian/src-foundations/palette";
import { SvgChevronLeftSingle } from "@guardian/src-icons";
import { Link } from "@guardian/src-link";
import React from "react";

const linkDividerCss = css`
  margin-top: ${space[12]}px;
  padding-top: ${space[9]}px;
  border-top: 1px solid ${neutral["86"]};
`;

export const BackToHelpCentreLink = () => (
  <div css={linkDividerCss}>
    <Link
      icon={<SvgChevronLeftSingle />}
      iconSide="left"
      subdued
      href="/help-centre"
    >
      Back to Help Centre
    </Link>
  </div>
);
