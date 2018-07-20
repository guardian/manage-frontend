import React from "react";
import { CheckFlowIsValid } from "../cancellationFlowWrapper";
import { MeResponse } from "../../../shared/meResponse";
import { RouteableProps } from "../wizardRouterAdapter";

export const FreeMembershipFlow = (props: RouteableProps) => (
  <CheckFlowIsValid
    validator={(me: MeResponse) =>
      me.contentAccess.member && !me.contentAccess.paidMember
    }
    checkingFor="'friend' membership"
  >
    <h1>Coming Soon</h1>
  </CheckFlowIsValid>
);
