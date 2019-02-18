import { NavigateFn } from "@reach/router";
import { get as getCookie } from "es-cookie";
import React from "react";
import {
  MembersDataApiResponseContext,
  ProductDetail,
  Subscription
} from "../../../../shared/productResponse";
import palette from "../../../colours";
import { minWidth } from "../../../styles/breakpoints";
import { FlowStartMultipleProductDetailHandler } from "../../flowStartMultipleProductDetailHandler";
import { QuestionsFooter } from "../../footer/in_page/questionsFooter";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { SupportTheGuardianButton } from "../../supportTheGuardianButton";
import {
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../../wizardRouterAdapter";
import { CardInputForm } from "./card/cardInputForm";
import { CurrentPaymentDetails } from "./currentPaymentDetails";
import { DirectDebitInputForm } from "./dd/directDebitInputForm";
import {
  NewPaymentMethodContext,
  NewPaymentMethodDetail
} from "./newPaymentMethodDetail";

enum PaymentMethod {
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

export const labelPaymentStepProps: (
  routeableStepProps: RouteableStepProps
) => RouteableStepProps = (routeableStepProps: RouteableStepProps) => ({
  stepLabels: ["Change details", "Summary", "Confirmation"],
  ...routeableStepProps
});

const PaymentMethodRadioButton = (props: PaymentMethodRadioButtonProps) => (
  <label
    css={{
      display: "inline-block",
      minWidth: "125px",
      backgroundColor:
        props.value === props.paymentMethod
          ? palette.neutral["4"]
          : palette.neutral["5"],
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

const subscriptionToPaymentMethod: (sub: Subscription) => PaymentMethod = (
  subscription: Subscription
) => {
  if (!subscription.safeToUpdatePaymentMethod) {
    return PaymentMethod.unknown;
  } else if (subscription.paymentMethod === "Card" && subscription.card) {
    return PaymentMethod.card;
  } else if (
    subscription.paymentMethod === "PayPal" &&
    subscription.payPalEmail
  ) {
    return PaymentMethod.payPal;
  } else if (
    subscription.paymentMethod === "DirectDebit" &&
    subscription.mandate
  ) {
    return PaymentMethod.dd;
  } else if (subscription.paymentMethod === "ResetRequired") {
    return PaymentMethod.resetRequired;
  } else if (subscription.paymentMethod === undefined) {
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

const getSignInEmailFromCookie = () => {
  return getCookie("GU_SIGNIN_EMAIL"); // TODO eliminate this because it can be incorrect in the case of 'social' accounts
};

class PaymentUpdaterStep extends React.Component<
  PaymentUpdaterStepProps,
  PaymentUpdaterStepState
> {
  public readonly currentPaymentMethod = subscriptionToPaymentMethod(
    this.props.productDetail.subscription
  );
  public state = {
    newPaymentMethodDetail: undefined,
    selectedPaymentMethod: this.currentPaymentMethod
  };

  public render(): React.ReactNode {
    return (
      <MembersDataApiResponseContext.Provider value={this.props.productDetail}>
        <NewPaymentMethodContext.Provider
          value={this.state.newPaymentMethodDetail || {}}
        >
          <NavigateFnContext.Provider
            value={{ navigate: this.props.routeableStepProps.navigate }}
          >
            <WizardStep
              routeableStepProps={this.props.routeableStepProps}
              extraFooterComponents={<QuestionsFooter />}
              hideBackButton
            >
              <div
                css={{
                  [minWidth.phablet]: {
                    display: "flex",
                    flexDirection: this.props.productDetail.alertText
                      ? "row-reverse"
                      : "row"
                  }
                }}
              >
                {this.props.productDetail.alertText ? (
                  <div>
                    <h3 css={{ marginBottom: "7px" }}>Why am I here?</h3>
                    <span>{this.props.productDetail.alertText}</span>
                  </div>
                ) : (
                  undefined
                )}
                <div css={{ minWidth: "260px" }}>
                  <h3>Current Payment Details</h3>
                  <CurrentPaymentDetails
                    {...this.props.productDetail.subscription}
                  />
                </div>
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
              <div css={{ height: "10px" }} />
              <ReturnToYourProductButton
                productType={this.props.routeableStepProps.productType}
              />
            </WizardStep>
          </NavigateFnContext.Provider>
        </NewPaymentMethodContext.Provider>
      </MembersDataApiResponseContext.Provider>
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
            userEmail={getSignInEmailFromCookie()}
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
            userEmail={subscription.card.email || getSignInEmailFromCookie()}
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
        return (
          <span>
            It is not currently possible to update your payment method online.
          </span>
        );
    }
  };
}

export const PaymentUpdateFlow = (props: RouteableStepProps) => (
  <FlowStartMultipleProductDetailHandler
    {...labelPaymentStepProps(props)}
    headingPrefix="Update payment for"
    supportRefererSuffix="payment_flow"
    loadingMessagePrefix="Retrieving current payment details for your"
    singleProductDetailRenderer={(
      routeableStepProps: RouteableStepProps,
      productDetail: ProductDetail
    ) => (
      <PaymentUpdaterStep
        routeableStepProps={routeableStepProps}
        productDetail={productDetail}
      />
    )}
  />
);
