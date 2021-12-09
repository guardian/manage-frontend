import React from "react";
import { css } from "@emotion/core";
import { textSans } from "@guardian/src-foundations/typography";
import { neutral } from "@guardian/src-foundations/palette";
import { minWidth } from "../../../styles/breakpoints";
import { space } from "@guardian/src-foundations";

const ContactUs = () => (
  <p
    css={css`
      width: 100%;
      border-top: 1px solid ${neutral[86]};
      ${textSans.medium()};
      color: ${neutral[46]};

      ${minWidth.tablet} {
        padding-top: ${space[9]}px;
      }
    `}
  >
    Are you experiencing difficulties switching your payment method?{" "}
  </p>
);

export default ContactUs;
