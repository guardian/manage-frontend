import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { brand, neutral } from "@guardian/src-foundations/palette";
import React from "react";
import { LinkButton } from "../buttons";

const divCss = css`
  margin: 67px ${space[3]}px 0 ${space[3]}px;
`;

const buttonDivCss = css`
  margin-top: ${space[4]}px;
  padding-top: ${space[4]}px;
  border-top: 1px solid ${neutral["86"]};
`;

export const BackToHelpCentreButton = () => (
  <div css={divCss}>
    <div css={buttonDivCss}>
      <LinkButton
        to="/help-centre"
        text={"Back to Help Centre"}
        fontWeight={"bold"}
        textColour={`${brand["400"]}`}
        colour={`${brand["800"]}`}
        left={true}
      />
    </div>
  </div>
);
