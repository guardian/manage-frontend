import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";
import {
  SupportTheGuardianButton,
  SupportTheGuardianButtonProps
} from "../supportTheGuardianButton";

export interface SupportTheGuardianSectionProps
  extends SupportTheGuardianButtonProps {
  message: string;
}

export const SupportTheGuardianSection = (
  props: SupportTheGuardianSectionProps
) => (
  <>
    <p
      css={css`
        ${textSans.medium()}
        margin-top: ${space[6]}px;
      `}
    >
      {props.message}
    </p>
    <SupportTheGuardianButton
      fontWeight="bold"
      textColour={palette.neutral[100]}
      colour={palette.brand[400]}
      notPrimary
      {...props}
    />
  </>
);
