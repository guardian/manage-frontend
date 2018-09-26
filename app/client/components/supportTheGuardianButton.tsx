import React from "react";
import { trackEvent } from "./analytics";
import { Button } from "./buttons";

export interface SupportTheGuardianButtonProps {
  supportReferer: string;
}

export const SupportTheGuardianButton = (
  props: SupportTheGuardianButtonProps
) => (
  <a
    href={`https://support.${window.guardian.domain}`}
    onClick={() => {
      trackEvent({
        eventCategory: "href",
        eventAction: "support_the_guardian",
        eventLabel: "support_from_" + props.supportReferer
      });
    }}
  >
    <Button text="Support The Guardian" primary right />
  </a>
);
