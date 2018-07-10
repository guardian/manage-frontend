import React from "react";
import { CallCentreNumbers } from "./callCentreNumbers";
import { PageContainer } from "./page";

export const GenericErrorScreen = () => (
  <PageContainer>
    <h2>Oops!</h2>
    <p>
      Sorry, it seems as if our system has made an error.
      <br />
      Please try again in 5 minutes. Alternatively, please call to speak to one
      of our customer service specialists.
    </p>
    <div css={{ display: "flex", marginBottom: "50px" }}>
      <p css={{ flexShrink: 0, paddingRight: "5px", margin: "0" }}>
        To contact us
      </p>
      <CallCentreNumbers />
    </div>
  </PageContainer>
);
