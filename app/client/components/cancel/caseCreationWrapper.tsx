import React from "react";
import { ProductDetail } from "../../../shared/productResponse";
import { MembersDataApiItem } from "../../../shared/productResponse";
import AsyncLoader from "../asyncLoader";
import { CancellationCaseIdContext } from "./cancellationContexts";
import { CancellationReasonContext } from "./cancellationContexts";
import { OptionalCancellationReasonId } from "./cancellationReason";

export interface CaseCreationResponse {
  id: string;
}

const getCreateCaseFunc = (
  reason: OptionalCancellationReasonId,
  sfProduct: string,
  membershipData: ProductDetail
) => async () =>
  await fetch("/api/case", {
    credentials: "include",
    method: "POST",
    mode: "same-origin",
    body: JSON.stringify({
      reason,
      product: sfProduct,
      subscriptionName: membershipData.subscription.subscriptionId,
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
  membersDataApiItem: MembersDataApiItem;
}

export const CaseCreationWrapper = (props: CaseCreationWrapperProps) => (
  <CancellationReasonContext.Consumer>
    {reason => (
      <CaseCreationAsyncLoader
        fetch={getCreateCaseFunc(
          reason,
          props.sfProduct,
          props.membersDataApiItem as ProductDetail
        )}
        render={renderWithCaseIdContextProvider(props.children)}
        errorRender={renderWithCaseIdContextProvider(props.children)}
        loadingMessage="Capturing your cancellation reason..."
      />
    )}
  </CancellationReasonContext.Consumer>
);
