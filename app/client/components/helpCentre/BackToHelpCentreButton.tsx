import { css } from "@emotion/react";
import { space } from "@guardian/src-foundations";
import { brand, neutral } from "@guardian/src-foundations/palette";
import { LinkButton } from "../buttons";

const buttonDivCss = css`
  margin-top: 60px;
  padding-top: ${space[4]}px;
  border-top: 1px solid ${neutral["86"]};
`;

export const BackToHelpCentreButton = () => (
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
);
