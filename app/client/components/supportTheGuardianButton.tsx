import React from "react";
import { trackEvent } from "./analytics";
import { Button } from "./buttons";

export interface SupportTheGuardianButtonProps {
  supportReferer: string;
  alternateButtonText?: string;
  urlSuffix?: string;
}

export const SupportTheGuardianButton = (
  props: SupportTheGuardianButtonProps
) => (
  <a
    href={`https://support.${window.guardian.domain}${props.urlSuffix ||
      ""}?INTCMP=mma_${props.supportReferer}`}
    onClick={() => {
      trackEvent({
        eventCategory: "href",
        eventAction: "support_the_guardian",
        eventLabel: "support_from_" + props.supportReferer
      });
    }}
  >
    <Button
      text={props.alternateButtonText || "Support The Guardian"}
      primary
      right
    />
  </a>
);
