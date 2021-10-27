import React from "react";
import {
  MDA_TEST_USER_HEADER,
  ProductDetail
} from "../../../shared/productResponse";
import { CancellationCaseIdContext } from "./cancellationContexts";
import { CancellationReasonContext } from "./cancellationContexts";
import { OptionalCancellationReasonId } from "./cancellationReason";
import DataFetcher from "../DataFetcher";
import {useSuspense} from "../suspense";
import {fetchWithDefaultParameters} from "../../fetch";

interface CaseCreationResponse {
  id: string;
}

const getCreateCaseFunc = (
  reason: OptionalCancellationReasonId,
  sfCaseProduct: string,
  productDetail: ProductDetail
) =>
  fetchWithDefaultParameters("/api/case", {
    method: "POST",
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

interface RenderWithCaseIdContextProviderProps {
  caseCreationProps: CaseCreationWrapperProps;
  startFetch: () => void | CaseCreationResponse;
}

const RenderWithCaseIdContextProvider = ({ caseCreationProps, startFetch }: RenderWithCaseIdContextProviderProps) => {
  const caseCreationResponse = startFetch();

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
        <RenderWithCaseIdContextProvider startFetch={useSuspense<CaseCreationResponse>(getCreateCaseFunc(
          reason,
          props.sfCaseProduct,
          props.productDetail
        ), true)} caseCreationProps={props} />
      </DataFetcher>
    )}
  </CancellationReasonContext.Consumer>
);
