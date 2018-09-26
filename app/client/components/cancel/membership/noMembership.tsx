import React from "react";
import { SupportTheGuardianButton } from "../../supportTheGuardianButton";

export const NoMembership = () => (
  <div>
    <h2>You do not currently have a membership.</h2>
    <p>
      If you are interested in supporting our journalism in other ways, please
      consider either a contribution or a subscription.
    </p>
    <div css={{ textAlign: "right" }}>
      <SupportTheGuardianButton supportReferer="no_membership_screen" />
    </div>
  </div>
);
