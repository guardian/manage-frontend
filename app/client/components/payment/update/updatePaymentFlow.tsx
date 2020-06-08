import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { space } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import { NavigateFn } from "@reach/router";
import * as Sentry from "@sentry/browser";
import React from "react";
import {
  MembersDataApiItemContext,
  ProductDetail,
  Subscription
} from "../../../../shared/productResponse";
import { IsInAccountOverviewContext } from "../../../accountOverviewRelease";
import { maxWidth } from "../../../styles/breakpoints";
import { LinkButton } from "../../buttons";
import { QuestionsFooter } from "../../footer/in_page/questionsFooter";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { ProductDetailWrapper } from "../../productDetailWrapper";
import { ProgressIndicator } from "../../progressIndicator";
import { SupportTheGuardianButton } from "../../supportTheGuardianButton";
import {
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../../wizardRouterAdapter";
import { PayPalDisplay } from "../paypalDisplay";
import { CardInputForm } from "./card/cardInputForm";
import { CurrentPaymentDetails } from "./currentPaymentDetails";
import { DirectDebitInputForm } from "./dd/directDebitInputForm";
import {
  NewPaymentMethodContext,
  NewPaymentMethodDetail
} from "./newPaymentMethodDetail";

export const paymentQuestionsTopicString = "updating your payment details";

export enum PaymentMethod {
  card = "Card",
  payPal = "PayPal",
  dd = "Direct Debit",
  resetRequired = "ResetRequired",
  free = "FREE",
  unknown = "Unknown"
}

interface PaymentMethodProps {
  value: PaymentMethod;
  updatePaymentMethod: (newPaymentMethod: PaymentMethod) => void;
}

interface PaymentMethodRadioButtonProps extends PaymentMethodProps {
  paymentMethod: PaymentMethod;
}

export const NavigateFnContext: React.Context<{
  navigate?: NavigateFn;
}> = React.createContext({});

const PaymentMethodRadioButton = (props: PaymentMethodRadioButtonProps) => (
  <label
    css={{
      display: "inline-block",
      minWidth: "125px",
      backgroundColor:
        props.value === props.paymentMethod
          ? palette.neutral[60]
          : palette.neutral[86],
      margin: "10px",
      padding: "20px",
      textAlign: "center",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    <input
      type="radio"
      name="payment_method"
      css={{ display: "none" }}
      value={props.paymentMethod}
      checked={props.value === props.paymentMethod}
      onChange={(changeEvent: any) =>
        props.updatePaymentMethod(changeEvent.target.value)
      }
    />
    {props.paymentMethod}
  </label>
);

const PaymentMethodBar = (props: PaymentMethodProps) => (
  <form
    css={{
      display: "none" // TODO show when we want to test appetite for switching payment method
    }}
  >
    <h3>New Payment Method</h3>
    <PaymentMethodRadioButton paymentMethod={PaymentMethod.card} {...props} />
    <PaymentMethodRadioButton paymentMethod={PaymentMethod.payPal} {...props} />
    <PaymentMethodRadioButton paymentMethod={PaymentMethod.dd} {...props} />
  </form>
);

const subscriptionToPaymentMethod = (productDetail: ProductDetail) => {
  if (!productDetail.subscription.safeToUpdatePaymentMethod) {
    return PaymentMethod.unknown;
  } else if (
    productDetail.subscription.paymentMethod === "Card" &&
    productDetail.subscription.card
  ) {
    return PaymentMethod.card;
  } else if (
    productDetail.subscription.paymentMethod === "PayPal" &&
    productDetail.subscription.payPalEmail
  ) {
    return PaymentMethod.payPal;
  } else if (
    productDetail.subscription.paymentMethod === "DirectDebit" &&
    productDetail.subscription.mandate
  ) {
    return PaymentMethod.dd;
  } else if (productDetail.subscription.paymentMethod === "ResetRequired") {
    return PaymentMethod.resetRequired;
  } else if (!productDetail.isPaidTier) {
    return PaymentMethod.free;
  }
  return PaymentMethod.unknown;
};

interface PaymentUpdaterStepProps {
  productDetail: ProductDetail;
  routeableStepProps: RouteableStepProps;
}

interface PaymentUpdaterStepState {
  selectedPaymentMethod: PaymentMethod;
  newPaymentMethodDetail?: NewPaymentMethodDetail;
}

class PaymentUpdaterStep extends React.Component<
  PaymentUpdaterStepProps,
  PaymentUpdaterStepState
> {
  public readonly currentPaymentMethod = subscriptionToPaymentMethod(
    this.props.productDetail
  );
  public state = {
    newPaymentMethodDetail: undefined,
    selectedPaymentMethod: this.currentPaymentMethod
  };

  public render(): React.ReactNode {
    const subHeadingCss = `
      border-top: 1px solid ${palette.neutral["86"]};
      ${headline.small()};
      font-weight: bold;
      margin-top: 50px;
      ${maxWidth.tablet} {
        font-size: 1.25rem;
        line-height: 1.6;
      };
    `;

    const innerContent = (isInAccountOverviewTest: boolean) => (
      <>
        {this.props.productDetail.subscription.payPalEmail ? (
          <>
            <h2
              css={css`
                ${subHeadingCss}
              `}
            >
              Payment method for{" "}
              {this.props.routeableStepProps.productType.friendlyName}
            </h2>
            <PayPalDisplay
              payPalId={this.props.productDetail.subscription.payPalEmail}
              shouldIncludePrefixCopy
            />
          </>
        ) : (
          <>
            <ProgressIndicator
              steps={[
                { title: "New details", isCurrentStep: true },
                { title: "Review" },
                { title: "Confirmation" }
              ]}
              additionalCSS={css`
                margin: ${space[5]}px 0 ${space[12]}px;
              `}
            />
            <h2
              css={css`
                ${subHeadingCss}
              `}
            >
              Update payment for your{" "}
              {this.props.routeableStepProps.productType.friendlyName}
            </h2>
            {this.props.productDetail.alertText && (
              <div>
                <h3 css={{ marginBottom: "7px" }}>Why am I here?</h3>
                <span>{this.props.productDetail.alertText}</span>
              </div>
            )}
            <div css={{ minWidth: "260px" }}>
              <h3>Current Payment Details</h3>
              <CurrentPaymentDetails
                {...this.props.productDetail.subscription}
              />
            </div>
            <PaymentMethodBar
              updatePaymentMethod={this.updatePaymentMethod}
              value={this.state.selectedPaymentMethod}
            />
            <h3>New Payment Details</h3>
            {this.getInputForm(
              this.props.productDetail.subscription,
              this.props.productDetail.isTestUser
            )}
          </>
        )}
        <div css={{ height: "10px" }} />
        {isInAccountOverviewTest ? (
          <LinkButton
            to={"/"}
            text={"Return to your account"}
            state={this.props.productDetail}
            colour={palette.neutral[100]}
            textColour={palette.neutral[0]}
            hollow
            left
          />
        ) : (
          <ReturnToYourProductButton
            productType={this.props.routeableStepProps.productType}
          />
        )}
      </>
    );

    return (
      <MembersDataApiItemContext.Provider value={this.props.productDetail}>
        <NewPaymentMethodContext.Provider
          value={this.state.newPaymentMethodDetail || {}}
        >
          <NavigateFnContext.Provider
            value={{ navigate: this.props.routeableStepProps.navigate }}
          >
            <IsInAccountOverviewContext.Consumer>
              {isInAccountOverviewTest => (
                <WizardStep
                  routeableStepProps={this.props.routeableStepProps}
                  extraFooterComponents={
                    <QuestionsFooter topic={paymentQuestionsTopicString} />
                  }
                  hideBackButton
                  fullWidth={isInAccountOverviewTest ? true : undefined}
                >
                  {isInAccountOverviewTest ? (
                    <>
                      <PageHeaderContainer
                        title="Manage payment method"
                        breadcrumbs={[
                          {
                            title: navLinks.accountOverview.title,
                            link: navLinks.accountOverview.link
                          },
                          {
                            title: "Manage payment method",
                            currentPage: true
                          }
                        ]}
                      />
                      <PageNavAndContentContainer
                        selectedNavItem={navLinks.accountOverview}
                      >
                        {innerContent(isInAccountOverviewTest)}
                      </PageNavAndContentContainer>
                    </>
                  ) : (
                    innerContent(isInAccountOverviewTest)
                  )}
                </WizardStep>
              )}
            </IsInAccountOverviewContext.Consumer>
          </NavigateFnContext.Provider>
        </NewPaymentMethodContext.Provider>
      </MembersDataApiItemContext.Provider>
    );
  }

  private newPaymentMethodDetailUpdater = (
    newPaymentMethodDetail: NewPaymentMethodDetail
  ) => this.setState({ newPaymentMethodDetail });

  private updatePaymentMethod = (newPaymentMethod: PaymentMethod) =>
    this.setState({ selectedPaymentMethod: newPaymentMethod });

  private getInputForm = (subscription: Subscription, isTestUser: boolean) => {
    switch (this.state.selectedPaymentMethod) {
      case PaymentMethod.resetRequired:
        return subscription.stripePublicKeyForCardAddition ? (
          <CardInputForm
            stripeApiKey={subscription.stripePublicKeyForCardAddition}
            newPaymentMethodDetailUpdater={this.newPaymentMethodDetailUpdater}
            userEmail={window.guardian.identityDetails.email}
          />
        ) : (
          <GenericErrorScreen loggingMessage="No Stripe key provided to enable adding a payment method" />
        );
      case PaymentMethod.card:
        return subscription.card &&
          subscription.card.stripePublicKeyForUpdate ? (
          <CardInputForm
            stripeApiKey={subscription.card.stripePublicKeyForUpdate}
            newPaymentMethodDetailUpdater={this.newPaymentMethodDetailUpdater}
            userEmail={
              subscription.card.email || window.guardian.identityDetails.email
            }
          />
        ) : (
          <GenericErrorScreen loggingMessage="No existing card information to update from" />
        );
      case PaymentMethod.free:
        return (
          <div>
            <p>
              If you are interested in supporting our journalism in other ways,
              please consider either a contribution or a subscription.
            </p>
            <SupportTheGuardianButton supportReferer="payment_flow" />
          </div>
        );
      case PaymentMethod.payPal:
        return (
          <p>
            Updating your PayPal payment details is not possible here. Please
            login to PayPal to change your payment details.
          </p>
        );
      case PaymentMethod.dd:
        return (
          <DirectDebitInputForm
            newPaymentMethodDetailUpdater={this.newPaymentMethodDetailUpdater}
            testUser={isTestUser}
          />
        );
      default:
        Sentry.captureException("user cannot update their payment online");
        return (
          <span>
            It is not currently possible to update your payment method online.
          </span>
        );
    }
  };
}

export const PaymentUpdateFlow = (props: RouteableStepProps) => (
  <ProductDetailWrapper
    {...props}
    loadingMessagePrefix="Retrieving current payment details for your"
    allowCancelledSubscription
  >
    {productDetail => (
      <PaymentUpdaterStep
        routeableStepProps={props}
        productDetail={productDetail}
      />
    )}
  </ProductDetailWrapper>
);
