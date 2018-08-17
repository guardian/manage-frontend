import React from "react";
import AsyncLoader from "./asyncLoader";
import { CancellationCaseIdContext } from "./cancel/cancellationContexts";
import { CancellationReasonContext } from "./cancel/cancellationContexts";
import { MembersDataApiResponse, MembershipData } from "./membership";

export interface CaseCreationResponse {
  id: string;
}

const getCreateCaseFunc = (
  reason: string,
  sfProduct: string,
  membershipData: MembershipData
) => async () =>
  await fetch("/api/case", {
    credentials: "include",
    method: "POST",
    mode: "same-origin",
    body: JSON.stringify({
      reason,
      product: sfProduct,
      subscriptionName: membershipData.subscription.subscriberId,
      gaData: "" + JSON.stringify(window.gaData)
    }),
    headers: { "Content-Type": "application/json" }
  });

const renderWithCaseIdContextProvider = (children: any) => (
  caseCreationResponse?: CaseCreationResponse
) =>
  caseCreationResponse ? (
    <CancellationCaseIdContext.Provider value={caseCreationResponse.id}>
      {children}
    </CancellationCaseIdContext.Provider>
  ) : (
    children
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
        errorRender={renderWithCaseIdContextProvider(props.children)}
        loadingMessage="Capturing your cancellation reason..."
      />
    )}
  </CancellationReasonContext.Consumer>
);
