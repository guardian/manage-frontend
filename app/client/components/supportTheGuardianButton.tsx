import React from "react";
import { trackEvent } from "./analytics";
import { Button } from "./buttons";
import url from "url";

export interface SupportTheGuardianButtonProps {
  supportReferer: string;
  alternateButtonText?: string;
  urlSuffix?: string;
}

const buildAcquisitionData = (supportReferer: string) => ({
  source: "GUARDIAN_WEB",
  componentType: "ACQUISITIONS_MANAGE_MY_ACCOUNT",
  componentId: `mma_${supportReferer}`,
  referrerPageviewId:
    window && window.guardian && window.guardian.ophan
      ? window.guardian.ophan.viewId
      : undefined,
  referrerUrl: window ? window.location.href : undefined
});

const buildHref = (supportReferer: string, urlSuffix: string | undefined) =>
  url.format({
    protocol: "https",
    host: `support.${window.guardian.domain}`,
    pathname: urlSuffix || "",
    query: {
      acquisitionData: JSON.stringify(buildAcquisitionData(supportReferer))
    }
  });

export const SupportTheGuardianButton = (
  props: SupportTheGuardianButtonProps
) => (
  <a
    href={buildHref(props.supportReferer, props.urlSuffix)}
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
