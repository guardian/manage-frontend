import { css } from "@emotion/core";
import React from "react";
import { Accordion } from "./accordion";

const contactUsStyles = {
  margin: "0 0 10px",
  paddingRight: "5px"
};

const callCenterStyles = css({
  marginBottom: "10px",
  display: "flex",
  flexWrap: "wrap",
  textAlign: "left",
  fontWeight: "normal"
});

const ukPhoneCommonPart = "330 333 6790";
export const ukPhoneNumber = `+44 (0) ${ukPhoneCommonPart}`;
export const ukPhoneNumberWithoutPrefix = `0${ukPhoneCommonPart}`;
export const ukPhoneNumberWithoutPrefix = "0330 333 6790";

export const ukOpeningTimes =
  "8am - 8pm on weekdays, 8am-6pm at weekends (GMT/BST)";

export interface CallCentreNumbersProps {
  prefixText?: string;
}

export const CallCentreNumbers = (props: CallCentreNumbersProps) => (
  <div css={callCenterStyles}>
    {props.prefixText && <p css={contactUsStyles}>{props.prefixText}</p>}
    <Accordion>
      <div title="United Kingdom, Europe and rest of world">
        <div>
          <b>{ukPhoneNumber}</b>
        </div>
        <div>{ukOpeningTimes}</div>
      </div>
      <div title="Australia, New Zealand, and Asia Pacific">
        <div>
          <b>1800 773 766</b> (within Australia)
        </div>
        <div>
          <b>+61 2​ 8​076 8599</b> (outside Australia)
        </div>
        <div>9am - 5pm Monday - Friday (AEDT)</div>
      </div>
      <div title="Canada and USA">
        <div>
          <b>1-844-632-2010</b> (toll free USA)
        </div>
        <div>
          <b>+1 917-900-4663</b> (outside USA)
        </div>
        <div>9am - 5pm on weekdays (EST/EDT)</div>
      </div>
    </Accordion>
  </div>
);
