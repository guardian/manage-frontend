import { NavigateFn } from "@reach/router";
import React from "react";
import { ReactStripeElements } from "react-stripe-elements";
import { ProductType, ProductTypes } from "../../../../shared/productTypes";
import palette from "../../../colours";
import { CheckFlowIsValid } from "../../cancellationFlowWrapper";
import { GenericErrorScreen } from "../../genericErrorScreen";
import {
  hasMembership,
  loadMembershipData,
  MembersDataApiResponse,
  MembershipAsyncLoader,
  MembershipData
} from "../../membership";
import { PageContainer } from "../../page";
import { MembersDataApiResponseContext, Subscription } from "../../user";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { CardInputForm, StripeTokenResponseContext } from "./cardInputForm";
import { CurrentPaymentDetails } from "./currentPaymentDetails";

enum PaymentMethod {
  card = "Card",
  payPal = "PayPal",
  dd = "Direct Debit"
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
  if (subscription.card) {
    return PaymentMethod.card;
  } else if (subscription.payPalEmail) {
    return PaymentMethod.payPal;
  }
  return PaymentMethod.dd;
};

interface PaymentUpdaterStepProps {
  data: MembershipData;
  routeableStepProps: RouteableStepProps;
}

interface PaymentUpdaterStepState {
  stripeTokenResponse: ReactStripeElements.PatchedTokenResponse;
  selectedPaymentMethod: PaymentMethod;
}

class PaymentUpdaterStep extends React.Component<
  PaymentUpdaterStepProps,
  PaymentUpdaterStepState
> {
  public state = {
    stripeTokenResponse: {},
    selectedPaymentMethod: subscriptionToPaymentMethod(
      this.props.data.subscription
    )
  };

  public render(): React.ReactNode {
    return (
      <MembersDataApiResponseContext.Provider value={this.props.data}>
        <StripeTokenResponseContext.Provider
          value={this.state.stripeTokenResponse}
        >
          <NavigateFnContext.Provider
            value={{ navigate: this.props.routeableStepProps.navigate }}
          >
            <WizardStep routeableStepProps={this.props.routeableStepProps}>
              <h3>Current Payment Details</h3>
              <CurrentPaymentDetails {...this.props.data.subscription} />
              <PaymentMethodBar
                updatePaymentMethod={this.updatePaymentMethod}
                value={this.state.selectedPaymentMethod}
              />
              <h3>New Payment Details</h3>
              {this.getInputForm(this.props.data.subscription)}
            </WizardStep>
          </NavigateFnContext.Provider>
        </StripeTokenResponseContext.Provider>
      </MembersDataApiResponseContext.Provider>
    );
  }

  private stripeTokenUpdater = (
    stripeTokenResponse: ReactStripeElements.PatchedTokenResponse
  ) => this.setState({ stripeTokenResponse });

  private updatePaymentMethod = (newPaymentMethod: PaymentMethod) =>
    this.setState({ selectedPaymentMethod: newPaymentMethod });

  private getInputForm = (subscription: Subscription) => {
    switch (this.state.selectedPaymentMethod) {
      case PaymentMethod.card:
        return subscription.card &&
          subscription.card.stripePublicKeyForUpdate ? (
          <CardInputForm
            stripeApiKey={subscription.card.stripePublicKeyForUpdate}
            stripeTokenUpdater={this.stripeTokenUpdater}
          />
        ) : (
          <GenericErrorScreen />
        );
      default:
        return (
          <span>TODO: {this.state.selectedPaymentMethod} details input</span>
        );
    }
  };
}

const getPaymentUpdateRenderer = (routeableStepProps: RouteableStepProps) => (
  data: MembersDataApiResponse
) =>
  hasMembership(data) ? (
    <PaymentUpdaterStep routeableStepProps={routeableStepProps} data={data} />
  ) : (
    <GenericErrorScreen />
  );

const createUpdatePaymentFlow = (productType: ProductType) => (
  props: RouteableStepProps
) => (
  <div>
    <h1
      css={{
        fontSize: "20px",
        margin: "10px 20px 0"
      }}
    >
      Update payment for your Guardian {productType.productName}
    </h1>
    <PageContainer>
      <CheckFlowIsValid {...productType}>
        <MembershipAsyncLoader
          fetch={loadMembershipData /*TODO reload on 'back' to page*/}
          render={getPaymentUpdateRenderer(props)}
          loadingMessage={`Retrieving current payment details for your ${
            productType.productName
          }...`}
        />
      </CheckFlowIsValid>
    </PageContainer>
  </div>
);

export const MembershipPaymentUpdateFlow = createUpdatePaymentFlow(
  ProductTypes.membership
);
