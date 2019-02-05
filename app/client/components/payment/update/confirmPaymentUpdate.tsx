import Raven from "raven-js";
import React from "react";
import {
  MembersDataApiResponseContext,
  ProductDetail
} from "../../../../shared/productResponse";
import { hasProduct } from "../../../../shared/productResponse";
import { trackEvent } from "../../analytics";
import { Button } from "../../buttons";
import { CallCentreNumbers } from "../../callCentreNumbers";
import { QuestionsFooter } from "../../footer/in_page/questionsFooter";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { CurrentPaymentDetails } from "./currentPaymentDetails";
import {
  isNewPaymentMethodDetail,
  NewPaymentMethodContext,
  NewPaymentMethodDetail,
  PaymentUpdateAsyncLoader
} from "./newPaymentMethodDetail";
import { handleNoNewPaymentDetails } from "./paymentUpdated";
import { labelPaymentStepProps } from "./updatePaymentFlow";

export const CONFIRM_BUTTON_TEXT = "Complete payment update";

interface ExecutePaymentUpdateProps extends RouteableStepProps {
  newPaymentMethodDetail: NewPaymentMethodDetail;
  productDetail: ProductDetail;
}

interface ExecutePaymentUpdateState {
  hasHitComplete: boolean;
}

class ExecutePaymentUpdate extends React.Component<
  ExecutePaymentUpdateProps,
  ExecutePaymentUpdateState
> {
  public state = {
    hasHitComplete: false
  };

  public render(): React.ReactNode {
    return this.state.hasHitComplete ? (
      <PaymentUpdateAsyncLoader
        fetch={this.executePaymentUpdate}
        render={this.renderUpdateResponse}
        errorRender={this.PaymentUpdateFailed}
        loadingMessage={`Updating ${
          this.props.newPaymentMethodDetail.friendlyName
        } details...`}
        spinnerScale={0.7}
        inline
      />
    ) : (
      <Button
        text={CONFIRM_BUTTON_TEXT}
        onClick={() => this.setState({ hasHitComplete: true })}
        primary
        right
      />
    );
  }

  private executePaymentUpdate: () => Promise<Response> = async () =>
    await fetch(
      `/api/payment/${this.props.newPaymentMethodDetail.apiUrlPart}/${
        this.props.productDetail.subscription.subscriptionId
      }`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(
          this.props.newPaymentMethodDetail.detailToPayloadObject()
        ),
        headers: { "Content-Type": "application/json" }
      }
    );

  private renderUpdateResponse = (response: object) => {
    if (
      this.props.navigate &&
      this.props.newPaymentMethodDetail.matchesResponse(response)
    ) {
      trackEvent({
        eventCategory: "payment",
        eventAction: this.props.newPaymentMethodDetail.name + "_update_success",
        product: {
          productType: this.props.productType,
          productDetail: this.props.productDetail
        },
        eventLabel: this.props.productType.urlPart
      });
      this.props.navigate("updated", { replace: true });
      return null;
    }

    return this.PaymentUpdateFailed();
  };

  private PaymentUpdateFailed = () => {
    trackEvent({
      eventCategory: "payment",
      eventAction: this.props.newPaymentMethodDetail.name + "_update_failed",
      product: {
        productType: this.props.productType,
        productDetail: this.props.productDetail
      },
      eventLabel: this.props.productType.urlPart
    });

    Raven.captureException(
      this.props.newPaymentMethodDetail.friendlyName + "payment update failed"
    );

    return (
      <div css={{ textAlign: "left", marginTop: "10px" }}>
        <h2>
          Sorry, the {this.props.newPaymentMethodDetail.friendlyName} update
          failed.
        </h2>
        <p>
          To try again please go back and re-enter your new{" "}
          {this.props.newPaymentMethodDetail.friendlyName} details.
          Alternatively, please call to speak to one of our customer service
          specialists.
        </p>
        <CallCentreNumbers prefixText="To contact us" />
      </div>
    );
  };
}

export const ConfirmPaymentUpdate = (props: RouteableStepProps) => (
  <NewPaymentMethodContext.Consumer>
    {newPaymentMethodDetail => (
      <MembersDataApiResponseContext.Consumer>
        {productDetail =>
          props.navigate &&
          isNewPaymentMethodDetail(newPaymentMethodDetail) &&
          hasProduct(productDetail) ? (
            <WizardStep
              routeableStepProps={labelPaymentStepProps(props)}
              extraFooterComponents={<QuestionsFooter />}
            >
              <h3>Please confirm your change from...</h3>
              <CurrentPaymentDetails {...productDetail.subscription} />
              <h3>...to...</h3>
              {newPaymentMethodDetail.render()}
              <div css={{ margin: "20px 0", textAlign: "right" }}>
                {newPaymentMethodDetail.confirmButtonWrapper(
                  <div css={{ marginTop: "20px", textAlign: "right" }}>
                    <ExecutePaymentUpdate
                      {...props}
                      productDetail={productDetail}
                      newPaymentMethodDetail={newPaymentMethodDetail}
                    />
                  </div>
                )}
              </div>
            </WizardStep>
          ) : (
            handleNoNewPaymentDetails(props)
          )
        }
      </MembersDataApiResponseContext.Consumer>
    )}
  </NewPaymentMethodContext.Consumer>
);
