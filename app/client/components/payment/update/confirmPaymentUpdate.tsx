import {css} from "@emotion/core";
import {space} from "@guardian/src-foundations";
import * as Sentry from "@sentry/browser";
import React from "react";
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../../../../shared/identity";
import {isProduct} from "../../../../shared/productResponse";
import {
  MembersDataApiItemContext,
  ProductDetail
} from "../../../../shared/productResponse";
import {trackEvent} from "../../analytics";
import {Button} from "../../buttons";
import {CallCentreNumbers} from "../../callCentreNumbers";
import {ProgressIndicator} from "../../progressIndicator";
import {
  RouteableStepProps,
  visuallyNavigateToParent,
  WizardStep
} from "../../wizardRouterAdapter";
import {CurrentPaymentDetails} from "./currentPaymentDetails";
import {
  isNewPaymentMethodDetail,
  NewPaymentMethodContext,
  NewPaymentMethodDetail,
} from "./newPaymentMethodDetail";
import {PaymentMethod} from "./updatePaymentFlow";
import {useMutation} from "react-fetching-library";
import type {Action} from "react-fetching-library";
import SpinLoader from "../../SpinLoader";

export const CONFIRM_BUTTON_TEXT = "Complete payment update";

interface NewPaymentMethod {
  newPaymentMethodDetail: NewPaymentMethodDetail;
  productDetail: ProductDetail;
}

const executePaymentUpdate = (params: NewPaymentMethod): Action<unknown> => ({
  endpoint: `/api/payment/${params.newPaymentMethodDetail.apiUrlPart}/${params.productDetail.subscription.subscriptionId}`,
  credentials: "include",
  method: "POST",
  body: params.newPaymentMethodDetail.detailToPayloadObject(),
  headers: {
    "Content-Type": "application/json",
    [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
      window.location.href
    )
  }
});


function ExecutePaymentUpdate(props: RouteableStepProps & NewPaymentMethod) {
  const {productDetail, productType, newPaymentMethodDetail} = props;

  const paymentMethodChangeType: string =
    productDetail.subscription.paymentMethod ===
    PaymentMethod.resetRequired
      ? "reset"
      : "update";


  const PaymentUpdateFailed = () => {
    trackEvent({
      eventCategory: "payment",
      eventAction: `${newPaymentMethodDetail.name}_${paymentMethodChangeType}_failed`,
      product: {
        productType: productType,
        productDetail: productDetail
      },
      eventLabel: productType.urlPart
    });

    Sentry.captureException(
      newPaymentMethodDetail.friendlyName + "payment update failed"
    );

    return (
      <div css={{textAlign: "left", marginTop: "10px"}}>
        <h2>
          Sorry, the {newPaymentMethodDetail.friendlyName} update
          failed.
        </h2>
        <p>
          To try again please go back and re-enter your new{" "}
          {newPaymentMethodDetail.friendlyName} details.
        </p>
        <CallCentreNumbers prefixText="Alternatively, to contact us"/>
      </div>
    );
  };

  const PaymentUpdateResponse = () => {
    const response = payload;

    if (
      props.navigate &&
      newPaymentMethodDetail.matchesResponse(response)
    ) {

      trackEvent({
        eventCategory: "payment",
        eventAction: `${newPaymentMethodDetail.name}_${paymentMethodChangeType}_success`,
        product: {
          productType: productType,
          productDetail: productDetail
        },
        eventLabel: productType.urlPart
      });

      props.navigate("updated", {
        replace: true,
        state: props.location?.state
      });

      return null;
    }

    return <PaymentUpdateFailed/>
  };

  const {mutate, error, payload, loading} = useMutation(executePaymentUpdate);

  if (error) {
    return <PaymentUpdateFailed/>
  }

  if (payload) {
    return <PaymentUpdateResponse />
  }

  return loading ? (
    <SpinLoader
      loadingMessage={`Updating ${newPaymentMethodDetail.friendlyName} details...`}
      spinnerScale={0.7}
      inline
    />
  ) : (
    <Button
      text={CONFIRM_BUTTON_TEXT}
      onClick={() => mutate({
        newPaymentMethodDetail: props.newPaymentMethodDetail,
        productDetail: productDetail
      })}
      primary
      right
    />
  );
}

interface InnerContentProps {
  productDetail: ProductDetail;
  newPaymentMethodDetail: NewPaymentMethodDetail;
  routeableStepProps: RouteableStepProps;
}

const InnerContent = (props: InnerContentProps) => (
  <>
    <ProgressIndicator
      steps={[
        {title: "New details"},
        {title: "Review", isCurrentStep: true},
        {title: "Confirmation"}
      ]}
      additionalCSS={css`
        margin: ${space[5]}px 0 ${space[12]}px;
      `}
    />
    <h3>Please confirm your change from...</h3>
    <CurrentPaymentDetails {...props.productDetail.subscription} />
    <h3>...to...</h3>
    {props.newPaymentMethodDetail.render()}
    <div css={{margin: "20px 0", textAlign: "right"}}>
      {props.newPaymentMethodDetail.confirmButtonWrapper(
        <div css={{marginTop: "20px", textAlign: "right"}}>
          <ExecutePaymentUpdate
            {...props.routeableStepProps}
            productDetail={props.productDetail}
            newPaymentMethodDetail={props.newPaymentMethodDetail}
          />
        </div>
      )}
    </div>
  </>
);

export const ConfirmPaymentUpdate = (props: RouteableStepProps) => (
  <NewPaymentMethodContext.Consumer>
    {newPaymentMethodDetail => (
      <MembersDataApiItemContext.Consumer>
        {productDetail =>
          props.navigate &&
          isNewPaymentMethodDetail(newPaymentMethodDetail) &&
          isProduct(productDetail) ? (
            <WizardStep routeableStepProps={props}>
              <InnerContent
                routeableStepProps={props}
                productDetail={productDetail}
                newPaymentMethodDetail={newPaymentMethodDetail}
              />
            </WizardStep>
          ) : (
            visuallyNavigateToParent(props)
          )
        }
      </MembersDataApiItemContext.Consumer>
    )}
  </NewPaymentMethodContext.Consumer>
);
