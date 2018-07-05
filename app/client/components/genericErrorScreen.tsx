import React from "react";
import { CallCentreNumbers } from "./callCentreNumbers";

export const GenericErrorScreen = () => (
  <div>
    <h3>Oops!</h3>
    <p>
      Sorry, it seems as if our system has made an error.
      <br />
      Please try again in 5 minutes. Alternatively, please call to speak to one
      of our customer service specialists.
    </p>
    <div css={{ display: "flex" }}>
      <span css={{ flexShrink: 0, paddingRight: "5px" }}>To contact us</span>
      <CallCentreNumbers />
    </div>
  </div>
);
