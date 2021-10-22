import React from "react";
import {
  MDA_TEST_USER_HEADER,
  ProductDetail
} from "../../../shared/productResponse";
import { CancellationCaseIdContext } from "./cancellationContexts";
import { CancellationReasonContext } from "./cancellationContexts";
import { OptionalCancellationReasonId } from "./cancellationReason";
import {Action, useSuspenseQuery} from "react-fetching-library";
import DataFetcher from "../DataFetcher";
import {allErrorStatuses, credentialHeaders} from "../../fetchClient";

interface CaseCreationResponse {
  id: string;
}

const getCreateCaseEndpoint = (
  reason: OptionalCancellationReasonId,
  sfCaseProduct: string,
  productDetail: ProductDetail
): Action<CaseCreationResponse> => ({
    method: "POST",
    endpoint: "/api/case",
    body: {
      reason,
      product: sfCaseProduct,
      subscriptionName: productDetail.subscription.subscriptionId,
      gaData: "" + JSON.stringify(window.gaData)
    },
    headers: {
      "Content-Type": "application/json",
      [MDA_TEST_USER_HEADER]: `${productDetail.isTestUser}`
    },
    ...credentialHeaders,
    config: {
      emitErrorForStatuses: allErrorStatuses
    }
})

interface RenderWithCaseIdContextProviderProps {
  reason: OptionalCancellationReasonId;
  caseCreationProps: CaseCreationWrapperProps;
}

const RenderWithCaseIdContextProvider = ({ reason, caseCreationProps}: RenderWithCaseIdContextProviderProps) => {
  const caseCreationResponse = useSuspenseQuery(getCreateCaseEndpoint(
    reason,
    caseCreationProps.sfCaseProduct,
    caseCreationProps.productDetail
  )).payload;

  return caseCreationResponse ? (
    <CancellationCaseIdContext.Provider value={caseCreationResponse.id}>
      {caseCreationProps.children}
    </CancellationCaseIdContext.Provider>
  ) : (
    caseCreationProps.children
  );
}

interface CaseCreationWrapperProps {
  children: JSX.Element;
  sfCaseProduct: string;
  productDetail: ProductDetail;
}

export const CaseCreationWrapper = (props: CaseCreationWrapperProps) => (
  <CancellationReasonContext.Consumer>
    {reason => (
      <DataFetcher loadingMessage="Capturing your cancellation reason...">
        <RenderWithCaseIdContextProvider reason={reason} caseCreationProps={props} />
      </DataFetcher>
    )}
  </CancellationReasonContext.Consumer>
);
