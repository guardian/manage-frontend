import Raven from "raven-js";
import React from "react";
import { trackEvent } from "../analytics";
import AsyncLoader from "./asyncLoader";
import { MembersDataApiResponse, MembershipData } from "./membership";
import { CancellationCaseIdContext, CancellationReasonContext } from "./user";

export interface CaseCreationResponse {
  id: string;
}

const getCreateCaseFunc = (
  reason: string,
  sfProduct: string,
  membershipData: MembershipData
) => async () => {
  const newCaseResponse: Response = await fetch("/api/case", {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({
      reason,
      product: sfProduct,
      subscriptionName: membershipData.subscription.subscriberId
    }),
    headers: { "Content-Type": "application/json" }
  });
  if (!newCaseResponse.ok) {
    trackEvent({
      eventCategory: "create SF Case",
      eventAction: "failed",
      eventLabel: newCaseResponse.statusText
    });
    Raven.captureException(
      "Failed to create case : " + newCaseResponse.statusText
    );
  }
  return newCaseResponse.json();
};

const renderWithCaseIdContextProvider = (children: any) => (
  caseCreationResponse: CaseCreationResponse
) => (
  <CancellationCaseIdContext.Provider value={caseCreationResponse.id}>
    {children}
  </CancellationCaseIdContext.Provider>
);

class CaseCreationAsyncLoader extends AsyncLoader<CaseCreationResponse> {}

export interface CaseCreationWrapperProps {
  children: any;
  sfProduct: string;
  membersDataApiResponse: MembersDataApiResponse;
}

export const CaseCreationWrapper = (props: CaseCreationWrapperProps) => (
  <CancellationReasonContext.Consumer>
    {reason => (
      <CaseCreationAsyncLoader
        fetch={getCreateCaseFunc(
          reason,
          props.sfProduct,
          props.membersDataApiResponse as MembershipData
        )}
        render={renderWithCaseIdContextProvider(props.children)}
        loadingMessage="Capturing your cancellation reason..."
      />
    )}
  </CancellationReasonContext.Consumer>
);
