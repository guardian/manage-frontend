import Raven from "raven-js";
import React from "react";
import { trackEvent } from "./analytics";
import { CallCentreNumbers } from "./callCentreNumbers";
import { PageContainer } from "./page";

export interface GenericErrorScreenProps {
  loggingMessage: string | false;
}

export const GenericErrorScreen = ({
  loggingMessage
}: GenericErrorScreenProps) => {
  if (loggingMessage) {
    Raven.captureException(loggingMessage);
    trackEvent({
      eventCategory: "genericErrorScreen",
      eventAction: "error",
      eventLabel: loggingMessage
    });
  }

  return (
    <PageContainer>
      <h2>Oops!</h2>
      <p>
        Sorry, it seems as if our system has made an error.
        <br />
        Please try again in 5 minutes. Alternatively, please call to speak to
        one of our customer service specialists.
      </p>
      <CallCentreNumbers prefixText="To contact us" />
    </PageContainer>
  );
};
