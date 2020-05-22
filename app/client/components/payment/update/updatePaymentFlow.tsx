import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { space } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import { NavigateFn } from "@reach/router";
import Raven from "raven-js";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  MembersDataApiItemContext,
  ProductDetail
} from "../../../../shared/productResponse";
import { IsInAccountOverviewContext } from "../../../accountOverviewRelease";
import { maxWidth } from "../../../styles/breakpoints";
import { LinkButton } from "../../buttons";
import { FlowStartMultipleProductDetailHandler } from "../../flowStartMultipleProductDetailHandler";
import { QuestionsFooter } from "../../footer/in_page/questionsFooter";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { ProgressIndicator } from "../../progressIndicator";
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
  updatePaymentMethod: Dispatch<SetStateAction<PaymentMethod>>;
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

interface PaymentUpdaterStepProps {
  productDetail: ProductDetail;
}
const PaymentUpdaterStep = (props: PaymentUpdaterStepProps) => {
  const [newPaymentMethodDetail, setNewPaymentMethodDetail] = useState<
    NewPaymentMethodDetail | undefined
  >();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    PaymentMethod
  >(subscriptionToPaymentMethod(props.productDetail));

  const InnerContent = () => {
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

    return (
      <>
        {selectedPaymentMethod !== PaymentMethod.payPal && (
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
        )}
        <h2
          css={css`
            ${subHeadingCss}
          `}
        >
          Update payment for your{" "}
          {props.routeableStepProps.productType.friendlyName}
        </h2>
        {props.productDetail.alertText && (
          <div>
            <h3 css={{ marginBottom: "7px" }}>Why am I here?</h3>
            <span>{props.productDetail.alertText}</span>
          </div>
        )}
        <div css={{ minWidth: "260px" }}>
          <h3>Current Payment Details</h3>
          <CurrentPaymentDetails {...props.productDetail.subscription} />
        </div>
        <PaymentMethodBar
          updatePaymentMethod={setSelectedPaymentMethod}
          value={selectedPaymentMethod}
        />
        <h3>New Payment Details</h3>
        <InputForm />
        <div css={{ height: "10px" }} />
        {useContext(IsInAccountOverviewContext) ? (
          <LinkButton
            to={"/"}
            text={"Return to your account"}
            state={props.productDetail}
            colour={palette.neutral[100]}
            textColour={palette.neutral[0]}
            hollow
            left
          />
        ) : (
          <ReturnToYourProductButton
            productType={props.routeableStepProps.productType}
          />
        )}
      </>
    );
  };

  const InputForm = () => {
    switch (selectedPaymentMethod) {
      case PaymentMethod.resetRequired:
        return props.productDetail.subscription
          .stripePublicKeyForCardAddition ? (
          <CardInputForm
            stripeApiKey={
              props.productDetail.subscription.stripePublicKeyForCardAddition
            }
            newPaymentMethodDetailUpdater={setNewPaymentMethodDetail}
            userEmail={window.guardian.identityDetails.email}
          />
        ) : (
          <GenericErrorScreen loggingMessage="No Stripe key provided to enable adding a payment method" />
        );
      case PaymentMethod.card:
        return props.productDetail.subscription.card &&
          props.productDetail.subscription.card.stripePublicKeyForUpdate ? (
          <CardInputForm
            stripeApiKey={
              props.productDetail.subscription.card.stripePublicKeyForUpdate
            }
            newPaymentMethodDetailUpdater={setNewPaymentMethodDetail}
            userEmail={
              props.productDetail.subscription.card.email ||
              window.guardian.identityDetails.email
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
            newPaymentMethodDetailUpdater={setNewPaymentMethodDetail}
            testUser={props.productDetail.isTestUser}
          />
        );
      default:
        Raven.captureException("user cannot update their payment online");
        return (
          <span>
            It is not currently possible to update your payment method online.
          </span>
        );
    }
  };

  return (
    <MembersDataApiItemContext.Provider value={props.productDetail}>
      <NewPaymentMethodContext.Provider value={newPaymentMethodDetail || {}}>
        <NavigateFnContext.Provider
          value={{ navigate: props.routeableStepProps.navigate }}
        >
          <WizardStep
            routeableStepProps={props.routeableStepProps}
            extraFooterComponents={
              <QuestionsFooter topic={paymentQuestionsTopicString} />
            }
            hideBackButton
            {...(useContext(IsInAccountOverviewContext)
              ? { fullWidth: true }
              : {})}
          >
            {useContext(IsInAccountOverviewContext) ? (
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
                  <InnerContent />
                </PageNavAndContentContainer>
              </>
            ) : (
              <InnerContent />
            )}
          </WizardStep>
        </NavigateFnContext.Provider>
      </NewPaymentMethodContext.Provider>
    </MembersDataApiItemContext.Provider>
  );
};

export const PaymentUpdateFlow = (props: RouteableStepProps) => (
  <FlowStartMultipleProductDetailHandler
    {...labelPaymentStepProps(props)}
    headingPrefix="Update payment for"
    hideHeading
    hasLeftNav={{
      pageTitle: "Manage contribution",
      selectedNavItem: navLinks.accountOverview
    }}
    supportRefererSuffix="payment_flow"
    loadingMessagePrefix="Retrieving current payment details for your"
    cancelledExplainer={`This ${props.productType.friendlyName} has been cancelled. Please contact us if you would like to re-start this ${props.productType.friendlyName}, make any amendments or need further help.`}
    singleProductDetailRenderer={(
      routeableStepProps: RouteableStepProps,
      productDetail: ProductDetail
    ) => (
      <PaymentUpdaterStep
        routeableStepProps={routeableStepProps}
        productDetail={productDetail}
      />
    )}
    allowCancelledSubscription
  />
);
