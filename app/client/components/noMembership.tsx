import React from "react";
import { SupportTheGuardianButton } from "./supportTheGuardianButton";

export const NoMembership = () => (
  <div>
    <h2>You do not currently have a membership.</h2>
    <p>
      Please support our journalism by making either a contribution or a
      subscription.
    </p>
    <SupportTheGuardianButton supportReferer="no_membership_screen" />
  </div>
);
