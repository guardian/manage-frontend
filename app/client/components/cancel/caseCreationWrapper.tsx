import React from "react";
import {
  MDA_TEST_USER_HEADER,
  ProductDetail
} from "../../../shared/productResponse";
import AsyncLoader from "../asyncLoader";
import { CancellationCaseIdContext } from "./cancellationContexts";
import { CancellationReasonContext } from "./cancellationContexts";
import { OptionalCancellationReasonId } from "./cancellationReason";

interface CaseCreationResponse {
  id: string;
}

const getCreateCaseFunc = (
  reason: OptionalCancellationReasonId,
  sfCaseProduct: string,
  productDetail: ProductDetail
) => async () =>
  await fetch("/api/case", {
    credentials: "include",
    method: "POST",
    mode: "same-origin",
    body: JSON.stringify({
      reason,
      product: sfCaseProduct,
      subscriptionName: productDetail.subscription.subscriptionId,
      gaData: "" + JSON.stringify(window.gaData)
    }),
    headers: {
      "Content-Type": "application/json",
      [MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`
    }
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

interface CaseCreationWrapperProps {
  children: any;
  sfCaseProduct: string;
  productDetail: ProductDetail;
}

export const CaseCreationWrapper = (props: CaseCreationWrapperProps) => (
  <CancellationReasonContext.Consumer>
    {reason => (
      <CaseCreationAsyncLoader
        fetch={getCreateCaseFunc(
          reason,
          props.sfCaseProduct,
          props.productDetail
        )}
        render={renderWithCaseIdContextProvider(props.children)}
        errorRender={renderWithCaseIdContextProvider(props.children)}
        loadingMessage="Capturing your cancellation reason..."
      />
    )}
  </CancellationReasonContext.Consumer>
);
