import { useEffect } from "react";
import { getGeoLocation } from "../../geolocation";

export const CMPBanner = () => {
  useEffect(() => {
    import("@guardian/consent-management-platform").then(({ cmp }) => {
      cmp.init({
        // Default to GB so it works when no geolocation
        // cookie is present (eg. local development)
        country: getGeoLocation() ?? "GB"
      });
    });
  }, []);

  return null;
};
