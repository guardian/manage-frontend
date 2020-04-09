import React, { ReactNode, ReactNodeArray } from "react";
import { visuallyNavigateToParent } from "../wizardRouterAdapter";
import {
  cancellationEffectiveToday,
  CancellationOutstandingCreditsContext,
  CancellationPolicyContext
} from "./cancellationContexts";
import { RouteableStepPropsWithCancellationFlow } from "./cancellationFlow";

export interface VoucherCancellationFlowEscalationCheckProps
  extends RouteableStepPropsWithCancellationFlow {
  children: (reasonsList: string[]) => ReactNode | ReactNodeArray;
}

const generateEscalationCausesList = (_: {
  isEffectiveToday: boolean;
  hasOutstandingHolidayStops: boolean;
}) => [
  ...(_.isEffectiveToday ? ["Requested Effective Today"] : []),
  ...(_.hasOutstandingHolidayStops ? ["Outstanding Holiday Stop Credits"] : [])
];

export const CancellationFlowEscalationCheck = (
  props: VoucherCancellationFlowEscalationCheckProps
) => (
  <CancellationOutstandingCreditsContext.Consumer>
    {outstandingCredits =>
      props.productType.cancellation.flowWrapper && !outstandingCredits ? (
        visuallyNavigateToParent(props)
      ) : (
        <CancellationPolicyContext.Consumer>
          {cancellationPolicy =>
            props.children(
              generateEscalationCausesList({
                isEffectiveToday:
                  cancellationPolicy === cancellationEffectiveToday,
                hasOutstandingHolidayStops:
                  !!outstandingCredits &&
                  outstandingCredits.holidayStops.length > 0
              })
            )
          }
        </CancellationPolicyContext.Consumer>
      )
    }
  </CancellationOutstandingCreditsContext.Consumer>
);
