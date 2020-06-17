import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import * as Sentry from "@sentry/browser";
import React from "react";
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../../../../shared/identity";
import { isProduct } from "../../../../shared/productResponse";
import {
  MembersDataApiItemContext,
  ProductDetail
} from "../../../../shared/productResponse";
import { trackEvent } from "../../analytics";
import { Button } from "../../buttons";
import { CallCentreNumbers } from "../../callCentreNumbers";
import { QuestionsFooter } from "../../footer/in_page/questionsFooter";
import { NAV_LINKS } from "../../nav/navConfig";
import { PageContainer } from "../../page";
import { ProgressIndicator } from "../../progressIndicator";
import {
  RouteableStepProps,
  visuallyNavigateToParent,
  WizardStep
} from "../../wizardRouterAdapter";
import { CurrentPaymentDetails } from "./currentPaymentDetails";
import {
  isNewPaymentMethodDetail,
  NewPaymentMethodContext,
  NewPaymentMethodDetail,
  PaymentUpdateAsyncLoader
} from "./newPaymentMethodDetail";
import {
  PaymentMethod,
  paymentQuestionsTopicString
} from "./updatePaymentFlow";

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

  private paymentMethodChangeType: string =
    this.props.productDetail.subscription.paymentMethod ===
    PaymentMethod.resetRequired
      ? "reset"
      : "update";

  public render(): React.ReactNode {
    return this.state.hasHitComplete ? (
      <PaymentUpdateAsyncLoader
        fetch={this.executePaymentUpdate}
        render={this.renderUpdateResponse}
        errorRender={this.PaymentUpdateFailed}
        loadingMessage={`Updating ${this.props.newPaymentMethodDetail.friendlyName} details...`}
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
      `/api/payment/${this.props.newPaymentMethodDetail.apiUrlPart}/${this.props.productDetail.subscription.subscriptionId}`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(
          this.props.newPaymentMethodDetail.detailToPayloadObject()
        ),
        headers: {
          "Content-Type": "application/json",
          [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
            window.location.href
          )
        }
      }
    );

  private renderUpdateResponse = (response: object) => {
    if (
      this.props.navigate &&
      this.props.newPaymentMethodDetail.matchesResponse(response)
    ) {
      trackEvent({
        eventCategory: "payment",
        eventAction: `${this.props.newPaymentMethodDetail.name}_${this.paymentMethodChangeType}_success`,
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
      eventAction: `${this.props.newPaymentMethodDetail.name}_${this.paymentMethodChangeType}_failed`,
      product: {
        productType: this.props.productType,
        productDetail: this.props.productDetail
      },
      eventLabel: this.props.productType.urlPart
    });

    Sentry.captureException(
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
        </p>
        <CallCentreNumbers prefixText="Alternatively, to contact us" />
      </div>
    );
  };
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
        { title: "New details" },
        { title: "Review", isCurrentStep: true },
        { title: "Confirmation" }
      ]}
      additionalCSS={css`
        margin: ${space[5]}px 0 ${space[12]}px;
      `}
    />
    <h3>Please confirm your change from...</h3>
    <CurrentPaymentDetails {...props.productDetail.subscription} />
    <h3>...to...</h3>
    {props.newPaymentMethodDetail.render()}
    <div css={{ margin: "20px 0", textAlign: "right" }}>
      {props.newPaymentMethodDetail.confirmButtonWrapper(
        <div css={{ marginTop: "20px", textAlign: "right" }}>
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

export const ConfirmPaymentUpdate = (props: RouteableStepProps) => {
  return (
    <NewPaymentMethodContext.Consumer>
      {newPaymentMethodDetail => (
        <MembersDataApiItemContext.Consumer>
          {productDetail =>
            props.navigate &&
            isNewPaymentMethodDetail(newPaymentMethodDetail) &&
            isProduct(productDetail) ? (
              <WizardStep
                routeableStepProps={props}
                extraFooterComponents={
                  <QuestionsFooter topic={paymentQuestionsTopicString} />
                }
              >
                <PageContainer
                  selectedNavItem={NAV_LINKS.accountOverview}
                  pageTitle="Manage payment method"
                  breadcrumbs={[
                    {
                      title: NAV_LINKS.accountOverview.title,
                      link: NAV_LINKS.accountOverview.link
                    },
                    {
                      title: "Manage payment method",
                      currentPage: true
                    }
                  ]}
                >
                  <InnerContent
                    routeableStepProps={props}
                    productDetail={productDetail}
                    newPaymentMethodDetail={newPaymentMethodDetail}
                  />
                </PageContainer>
              </WizardStep>
            ) : (
              visuallyNavigateToParent(props)
            )
          }
        </MembersDataApiItemContext.Consumer>
      )}
    </NewPaymentMethodContext.Consumer>
  );
};
