import React from "react";
import { CALL_CENTRE_NUMBERS } from "./user";

export const GenericErrorScreen = () => (
  <div>
    <h3>Oops!</h3>
    <p>
      Sorry, it seems as if our system has made an error.
      <br />
      Please try again in 5 minutes. Alternatively, please call to speak to one
      of our customer service specialists.
    </p>
    <p>You can contact us on {CALL_CENTRE_NUMBERS}</p>
  </div>
);
