import { css } from "@emotion/core";
import { neutral } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";

export const linkAnchorStyle = css`
  display: inline-block;
  width: 100%;
  ${textSans.medium()};
  color: ${neutral["7"]};
  :visited {
    color: ${neutral["7"]};
  }
`;

export const linkArrowStyle = css`
  display: block;
  width: 7px;
  height: 7px;
  border-top: 2px solid ${neutral["7"]};
  border-right: 2px solid ${neutral["7"]};
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  right: 7px;
`;
