import React from "react";
import { getGeoLocation } from "../../geolocation";

export class ConsentsBanner extends React.Component {
  public componentDidMount = () => {
    import("@guardian/consent-management-platform").then(({ cmp }) => {
      cmp.init({
        // Default to GB so it works when no geolocation
        // cookie is present (eg. local development)
        country: getGeoLocation() ?? "GB"
      });
    });
  };

  public render = () => null;
}
