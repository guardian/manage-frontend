import React from "react";
import { minWidth } from "../styles/breakpoints";
import { css } from "../styles/emotion";
import { CallCentreNumbers } from "./callCentreNumbers";
import { PageContainer } from "./page";

const contactUsStyles = css({
  margin: "0 0 10px",

  [minWidth.phablet]: {
    paddingRight: "5px",
    margin: "0",
    flexBasis: "40%"
  }
});

const callCenterStyles = css({
  marginBottom: "50px",

  [minWidth.phablet]: {
    display: "flex"
  }
});

export const GenericErrorScreen = () => (
  <PageContainer>
    <h2>Oops!</h2>
    <p>
      Sorry, it seems as if our system has made an error.
      <br />
      Please try again in 5 minutes. Alternatively, please call to speak to one
      of our customer service specialists.
    </p>
    <div className={callCenterStyles}>
      <p className={contactUsStyles}>To contact us</p>
      <CallCentreNumbers />
    </div>
  </PageContainer>
);
