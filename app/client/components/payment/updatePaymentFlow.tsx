import React from "react";
import { CheckFlowIsValid } from "../cancellationFlowWrapper";
import { GenericErrorScreen } from "../genericErrorScreen";
import {
  hasMembership,
  loadMembershipData,
  MembersDataApiResponse,
  MembershipAsyncLoader,
  MembershipData
} from "../membership";
import { PageContainer } from "../page";
import {
  MembersDataApiResponseContext,
  ProductType,
  Subscription
} from "../user";
import { RouteableStepProps, WizardStep } from "../wizardRouterAdapter";
import { CardDisplay } from "./cardDisplay";

const CurrentPaymentDetails = (subscription: Subscription) => {
  if (subscription.card) {
    return (
      <div css={{ display: "flex", alignItems: "center" }}>
        <span css={{ marginRight: "10px" }}>Currently</span>
        <CardDisplay {...subscription.card} />
      </div>
    );
  } else if (subscription.payPalEmail) {
    return <div>Using PayPal</div>; // TODO re-use PayPalDisplay
  }
  return <span>Direct Debit ????????</span>;
};

interface PaymentUpdaterProps {
  data: MembershipData;
  routeableStepProps: RouteableStepProps;
}

const PaymentUpdater = (props: PaymentUpdaterProps) => (
  <MembersDataApiResponseContext.Provider value={props.data}>
    <WizardStep routeableStepProps={props.routeableStepProps}>
      <CurrentPaymentDetails {...props.data.subscription} />
    </WizardStep>
  </MembersDataApiResponseContext.Provider>
);

const getPaymentUpdateRenderer = (routeableStepProps: RouteableStepProps) => (
  data: MembersDataApiResponse
) =>
  hasMembership(data) ? (
    <PaymentUpdater routeableStepProps={routeableStepProps} data={data} />
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
          fetch={loadMembershipData}
          render={getPaymentUpdateRenderer(props)}
          loadingMessage={`Retrieving current payment details for your ${
            productType.productName
          }...`}
        />
      </CheckFlowIsValid>
    </PageContainer>
  </div>
);

export const MembershipPaymentUpdateFlow = createUpdatePaymentFlow({
  productName: "membership",
  validator: me => true
}); // TODO swap back to ProductTypes.membership
