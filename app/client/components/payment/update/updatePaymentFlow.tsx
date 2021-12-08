import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../../../../shared/identity";
import { css } from "@emotion/core";
import { neutral, brand } from "@guardian/src-foundations/palette";
import { space } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import { Radio } from "@guardian/src-radio";
import { NavigateFn } from "@reach/router";
import * as Sentry from "@sentry/browser";
import React from "react";
import {
  MembersDataApiItemContext,
  ProductDetail,
  Subscription,
  WithSubscription
} from "../../../../shared/productResponse";
import { maxWidth, minWidth } from "../../../styles/breakpoints";
import { FlowWrapper } from "../../FlowWrapper";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { getNavItemFromFlowReferrer } from "../../nav/navConfig";
import { SupportTheGuardianButton } from "../../supportTheGuardianButton";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { augmentPaymentFailureAlertText } from "../paymentFailureAlertIfApplicable";
import { PayPalDisplay } from "../paypalDisplay";
import { CardInputForm } from "./card/cardInputForm";
import CurrentPaymentDetails from "./CurrentPaymentDetail";
import { DirectDebitInputForm } from "./dd/directDebitInputForm";
import {
  NewPaymentMethodContext,
  NewPaymentMethodDetail
} from "./newPaymentMethodDetail";
import { getStripeKey } from "../../../stripe";
import OverlayLoader from "../../OverlayLoader";
import { createProductDetailFetch } from "../../../productUtils";
import { NewSubscriptionContext } from "./newSubscriptionDetail";
import { processResponse } from "../../../utils";
import { trackEvent } from "../../analytics";
import ErrorSummary from "./ErrorSummary";
import { DirectDebitLogo } from "../directDebitLogo";
import { cardTypeToSVG } from "../cardDisplay";

export enum PaymentMethod {
  card = "Card",
  payPal = "PayPal",
  dd = "Direct Debit",
  resetRequired = "ResetRequired",
  free = "FREE",
  unknown = "Unknown"
}

const subHeadingCss = `
      border-top: 1px solid ${neutral["86"]};
      ${headline.small()};
      font-weight: bold;
      margin-top: 50px;
      ${maxWidth.tablet} {
        font-size: 1.25rem;
        line-height: 1.6;
      };
    `;
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

export const FlowReferrerContext = React.createContext({});

function getLogos(paymentMethod: PaymentMethod) {
  if (paymentMethod === PaymentMethod.card) {
    return (
      <div
        css={css`
          display: flex;
        `}
      >
        {cardTypeToSVG("visa")}
        {cardTypeToSVG("mastercard")}
        {cardTypeToSVG("americanexpress")}
      </div>
    );
  } else if (paymentMethod === PaymentMethod.dd) {
    return (
      <DirectDebitLogo
        fill={brand[400]}
        additionalCss={css`
          margin: 0 10px 0 0;
        `}
      />
    );
  }
}

const PaymentMethodRadioButton = (props: PaymentMethodRadioButtonProps) => {
  const isChecked = props.value === props.paymentMethod;

  const radioIsChecked = css`
    -webkit-box-shadow: inset 0px 0px 0px 4px ${brand[500]};
    -moz-box-shadow: inset 0px 0px 0px 4px ${brand[500]};
    box-shadow: inset 0px 0px 0px 4px ${brand[500]};

    background-color: #e3f6ff;

    div {
      color: ${brand[400]};
    }
  `;

  const radioDefault = css`
    -webkit-box-shadow: inset 0px 0px 0px 2px ${neutral[46]}
    -moz-box-shadow: inset 0px 0px 0px 2px ${neutral[46]};
    box-shadow: inset 0px 0px 0px 2px ${neutral[46]};
    
    div {
      color: ${neutral[46]};
    }
  `;

  return (
    <div
      css={css`
        display: flex;
        border-radius: 4px;
        padding: ${space[4]}px;
        margin-bottom: ${space[4]}px;
        ${isChecked ? radioIsChecked : radioDefault}

        label {
          min-height: 0;
          flex: 1;

          div {
            font-weight: bold;
          }
        }
      `}
    >
      <Radio
        checked={isChecked}
        label={props.paymentMethod}
        supporting=""
        onChange={(changeEvent: React.ChangeEvent<HTMLInputElement>) =>
          props.updatePaymentMethod(changeEvent.target.value as PaymentMethod)
        }
        value={props.paymentMethod}
      />
      <div
        css={css`
          display: none;
          ${minWidth.mobile} {
            display: block;
            margin: auto;
          }
        `}
      >
        {getLogos(props.paymentMethod)}
      </div>
    </div>

    /*
  <label
    css={{
      display: "inline-block",
      minWidth: "125px",
      backgroundColor:
        props.value === props.paymentMethod ? neutral[60] : neutral[86],
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
      value={props.paymentMethod}
      checked={props.value === props.paymentMethod}
      onChange={(changeEvent: React.ChangeEvent<HTMLInputElement>) =>
        props.updatePaymentMethod(changeEvent.target.value as PaymentMethod)
      }
    />
    {props.paymentMethod}
  </label>
    */
  );
};

export const SelectPaymentMethod = (
  props: PaymentMethodProps & { currentPaymentMethod: string | undefined }
) => (
  <form>
    <PaymentMethodRadioButton paymentMethod={PaymentMethod.card} {...props} />
    {props.currentPaymentMethod === "DirectDebit" && (
      <PaymentMethodRadioButton paymentMethod={PaymentMethod.dd} {...props} />
    )}
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
  executingPaymentUpdate: boolean;
  selectedPaymentMethod: PaymentMethod;
  newPaymentMethodDetail?: NewPaymentMethodDetail;
  newSubscriptionData?: WithSubscription[];
}

class PaymentUpdaterStep extends React.Component<
  PaymentUpdaterStepProps,
  PaymentUpdaterStepState
> {
  public readonly currentPaymentMethod = subscriptionToPaymentMethod(
    this.props.productDetail
  );
  public state = {
    executingPaymentUpdate: false,
    newPaymentMethodDetail: undefined,
    newSubscriptionData: undefined,
    selectedPaymentMethod: PaymentMethod.unknown
  };

  private executePaymentUpdate = async (
    newPaymentMethodDetail: NewPaymentMethodDetail
  ) => {
    this.setState({ executingPaymentUpdate: true });

    try {
      const executePaymentUpdate = await fetch(
        `/api/payment/${newPaymentMethodDetail.apiUrlPart}/${this.props.productDetail.subscription.subscriptionId}`,
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify(newPaymentMethodDetail.detailToPayloadObject()),
          headers: {
            "Content-Type": "application/json",
            [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
              window.location.href
            )
          }
        }
      );

      const response = await processResponse<NewPaymentMethodDetail>(
        executePaymentUpdate
      );

      if (
        this.props.routeableStepProps.navigate &&
        newPaymentMethodDetail.matchesResponse(response)
      ) {
        const paymentMethodChangeType: string =
          this.props.productDetail.subscription.paymentMethod ===
          PaymentMethod.resetRequired
            ? "reset"
            : "update";

        trackEvent({
          eventCategory: "payment",
          eventAction: `${newPaymentMethodDetail.name}_${paymentMethodChangeType}_success`,
          product: {
            productType: this.props.routeableStepProps.productType,
            productDetail: this.props.productDetail
          },
          eventLabel: this.props.routeableStepProps.productType.urlPart
        });

        // refetch subscription from members data api
        const newSubscriptionData = await createProductDetailFetch(
          this.props.routeableStepProps.productType,
          this.props.productDetail.subscription.subscriptionId
        );
        this.setState({ newSubscriptionData });

        this.props.routeableStepProps.navigate("updated", {
          state: this.props.routeableStepProps.location?.state
        });
      }
    } catch {
      this.props.routeableStepProps.navigate &&
        this.props.routeableStepProps.navigate("failed", {
          state: this.props.routeableStepProps.location?.state
        });
    }

    this.setState({ executingPaymentUpdate: false });
  };

  private newPaymentMethodDetailUpdater = (
    newPaymentMethodDetail: NewPaymentMethodDetail
  ) => this.setState({ newPaymentMethodDetail });

  private updatePaymentMethod = (newPaymentMethod: PaymentMethod) =>
    this.setState({ selectedPaymentMethod: newPaymentMethod });

  private getInputForm = (subscription: Subscription, isTestUser: boolean) => {
    let stripePublicKey: string | undefined;

    if (subscription.card) {
      stripePublicKey = subscription.card.stripePublicKeyForUpdate;
    } else {
      stripePublicKey = getStripeKey(
        subscription.deliveryAddress?.country,
        isTestUser
      );
    }

    switch (this.state.selectedPaymentMethod) {
      case PaymentMethod.resetRequired:
        return stripePublicKey ? (
          <CardInputForm
            stripeApiKey={stripePublicKey}
            newPaymentMethodDetailUpdater={this.newPaymentMethodDetailUpdater}
            userEmail={window.guardian.identityDetails.email}
            executePaymentUpdate={this.executePaymentUpdate}
          />
        ) : (
          <GenericErrorScreen loggingMessage="No Stripe key provided to enable adding a payment method" />
        );
      case PaymentMethod.card:
        return stripePublicKey ? (
          <CardInputForm
            stripeApiKey={stripePublicKey}
            newPaymentMethodDetailUpdater={this.newPaymentMethodDetailUpdater}
            userEmail={window.guardian.identityDetails.email}
            executePaymentUpdate={this.executePaymentUpdate}
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
            executePaymentUpdate={this.executePaymentUpdate}
          />
        );
      case PaymentMethod.unknown:
        return null;
      default:
        Sentry.captureException("user cannot update their payment online");
        return (
          <span>
            It is not currently possible to update your payment method online.
          </span>
        );
    }
  };

  public render(): React.ReactNode {
    const innerContent = (
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
            <div css={{ minWidth: "260px" }}>
              {this.props.productDetail.alertText && (
                <ErrorSummary
                  cssOverrides={css`
                    margin-top: ${space[9]}px;
                  `}
                  message={augmentPaymentFailureAlertText(
                    this.props.productDetail.alertText
                  )}
                />
              )}
              <h3
                css={css`
                  ${subHeadingCss}
                `}
              >
                Your current payment method
              </h3>
              <CurrentPaymentDetails {...this.props.productDetail} />
            </div>

            <h3
              css={css`
                ${subHeadingCss}
              `}
            >
              {this.state.selectedPaymentMethod === PaymentMethod.unknown
                ? "Update your payment method"
                : "Choose your payment method"}
            </h3>

            <SelectPaymentMethod
              updatePaymentMethod={this.updatePaymentMethod}
              value={this.state.selectedPaymentMethod}
              currentPaymentMethod={
                this.props.productDetail.subscription.paymentMethod
              }
            />
            {this.getInputForm(
              this.props.productDetail.subscription,
              this.props.productDetail.isTestUser
            )}
          </>
        )}
        <div css={{ height: "10px" }} />
      </>
    );

    return (
      <MembersDataApiItemContext.Provider value={this.props.productDetail}>
        <NewPaymentMethodContext.Provider
          value={this.state.newPaymentMethodDetail || {}}
        >
          <NewSubscriptionContext.Provider
            value={this.state.newSubscriptionData || {}}
          >
            <NavigateFnContext.Provider
              value={{ navigate: this.props.routeableStepProps.navigate }}
            >
              <WizardStep routeableStepProps={this.props.routeableStepProps}>
                {this.state.executingPaymentUpdate && (
                  <OverlayLoader message={`Updating payment details...`} />
                )}
                {innerContent}
              </WizardStep>
            </NavigateFnContext.Provider>
          </NewSubscriptionContext.Provider>
        </NewPaymentMethodContext.Provider>
      </MembersDataApiItemContext.Provider>
    );
  }
}

const PaymentUpdateFlow = (props: RouteableStepProps) => {
  const navItemReferrer = getNavItemFromFlowReferrer(
    props.location?.state?.flowReferrer?.title
  );

  return (
    <FlowReferrerContext.Provider value={props.location?.state}>
      <FlowWrapper
        {...props}
        loadingMessagePrefix="Retrieving current payment details for your"
        allowCancelledSubscription
        selectedNavItem={navItemReferrer}
        pageTitle="Manage payment method"
        breadcrumbs={[
          {
            title: navItemReferrer.title,
            link: navItemReferrer.link
          },
          {
            title: "Manage payment method",
            currentPage: true
          }
        ]}
      >
        {productDetail => (
          <PaymentUpdaterStep
            routeableStepProps={props}
            productDetail={productDetail}
          />
        )}
      </FlowWrapper>
    </FlowReferrerContext.Provider>
  );
};

export default PaymentUpdateFlow;
