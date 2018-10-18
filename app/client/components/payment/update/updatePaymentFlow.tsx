import { NavigateFn } from "@reach/router";
import { get as getCookie } from "es-cookie";
import React from "react";
import { ReactStripeElements } from "react-stripe-elements";
import {
  MembersDataApiResponseContext,
  MembersDatApiAsyncLoader
} from "../../../../shared/productResponse";
import {
  hasProduct,
  MembersDataApiResponse,
  ProductDetail,
  Subscription
} from "../../../../shared/productResponse";
import {
  createProductDetailFetcher,
  ProductType
} from "../../../../shared/productTypes";
import palette from "../../../colours";
import { minWidth } from "../../../styles/breakpoints";
import { CheckFlowIsValid } from "../../checkFlowIsValid";
import { QuestionsFooter } from "../../footer/in_page/questionsFooter";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { NoProduct } from "../../noProduct";
import { PageContainer } from "../../page";
import { SupportTheGuardianButton } from "../../supportTheGuardianButton";
import {
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../../wizardRouterAdapter";
import { CardInputForm, StripeTokenResponseContext } from "./cardInputForm";
import { CurrentPaymentDetails } from "./currentPaymentDetails";

enum PaymentMethod {
  card = "Card",
  payPal = "PayPal",
  dd = "Direct Debit",
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

export const labelPaymentStepProps = (
  routeableStepProps: RouteableStepProps
) => ({
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
        props.updatePaymentMethod(changeEvent.target.newAmount)
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
  if (subscription.paymentMethod === "Card" && subscription.card) {
    return PaymentMethod.card;
  } else if (
    subscription.paymentMethod === "PayPal" &&
    subscription.payPalEmail
  ) {
    return PaymentMethod.payPal;
  } else if (
    subscription.paymentMethod === "DirectDebit" &&
    subscription.account
  ) {
    return PaymentMethod.dd;
  } else if (subscription.paymentMethod === undefined) {
    return PaymentMethod.free;
  }
  return PaymentMethod.unknown;
};

interface PaymentUpdaterStepProps {
  data: ProductDetail;
  routeableStepProps: RouteableStepProps;
}

interface PaymentUpdaterStepState {
  stripeTokenResponse: ReactStripeElements.PatchedTokenResponse;
  selectedPaymentMethod: PaymentMethod;
}

const getSignInEmailFromCookie = () => {
  return getCookie("GU_SIGNIN_EMAIL");
};

class PaymentUpdaterStep extends React.Component<
  PaymentUpdaterStepProps,
  PaymentUpdaterStepState
> {
  public readonly currentPaymentMethod = subscriptionToPaymentMethod(
    this.props.data.subscription
  );
  public state = {
    stripeTokenResponse: {},
    selectedPaymentMethod: this.currentPaymentMethod
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
            <WizardStep
              routeableStepProps={this.props.routeableStepProps}
              extraFooterComponents={<QuestionsFooter />}
              hideBackButton
            >
              <div
                css={{
                  [minWidth.phablet]: {
                    display: "flex",
                    flexDirection: this.props.data.alertText
                      ? "row-reverse"
                      : "row"
                  }
                }}
              >
                {this.props.data.alertText ? (
                  <div>
                    <h3 css={{ marginBottom: "7px" }}>Why am I here?</h3>
                    <span>{this.props.data.alertText}</span>
                  </div>
                ) : (
                  undefined
                )}
                <div css={{ minWidth: "260px" }}>
                  <h3>Current Payment Details</h3>
                  <CurrentPaymentDetails {...this.props.data.subscription} />
                </div>
              </div>
              <PaymentMethodBar
                updatePaymentMethod={this.updatePaymentMethod}
                value={this.state.selectedPaymentMethod}
              />
              <h3>New Payment Details</h3>
              {this.getInputForm(this.props.data.subscription)}
              <div css={{ height: "10px" }} />
              <ReturnToYourProductButton
                productType={this.props.routeableStepProps.productType}
              />
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
      default:
        return (
          <span>
            Updating {this.state.selectedPaymentMethod} is not currently
            possible online.
          </span>
        );
    }
  };
}

const getPaymentUpdateRenderer = (
  productType: ProductType,
  routeableStepProps: RouteableStepProps
) => (data: MembersDataApiResponse) =>
  hasProduct(data) ? (
    <PaymentUpdaterStep routeableStepProps={routeableStepProps} data={data} />
  ) : (
    <NoProduct
      inTab={false}
      supportRefererSuffix="payment_flow"
      productType={productType}
    />
  );

export const PaymentUpdateFlow = (props: RouteableStepProps) => (
  <div>
    <PageContainer>
      <h1 css={{ fontSize: "24px" }}>
        Update payment for your{" "}
        {props.productType.includeGuardianInTitles ? "Guardian " : ""}
        {props.productType.friendlyName}
      </h1>
    </PageContainer>
    <CheckFlowIsValid
      {...props.productType}
      supportRefererSuffix="payment_flow"
    >
      <MembersDatApiAsyncLoader
        fetch={
          createProductDetailFetcher(
            props.productType
          ) /*TODO reload on 'back' to page*/
        }
        render={getPaymentUpdateRenderer(
          props.productType,
          labelPaymentStepProps(props)
        )}
        loadingMessage={`Retrieving current payment details for your ${
          props.productType.friendlyName
        }...`}
      />
    </CheckFlowIsValid>
  </div>
);
