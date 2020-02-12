import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import React, { useContext } from "react";
import {
  DeliveryRecordApiItem,
  PaidSubscriptionPlan,
  ProductDetail
} from "../../../../shared/productResponse";
import { getMainPlan } from "../../../../shared/productResponse";
import { ProductUrlPart } from "../../../../shared/productTypes";
import { maxWidth } from "../../../styles/breakpoints";
import { FlowStartMultipleProductDetailHandler } from "../../flowStartMultipleProductDetailHandler";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { DeliveryRecordCard } from "./deliveryRecordCard";
import { PageStatus } from "./deliveryRecords";
import {
  createDeliveryRecordsFetcher,
  createDeliveryRecordsProblemPost,
  DeliveryRecordsApiAsyncLoader,
  DeliveryRecordsResponse
} from "./deliveryRecordsApi";
import { DeliveryRecordsProblemPostPayloadContext } from "./deliveryRecordsProblemContext";

interface DeliveryRecordsProblemConfirmationFCProps {
  data: DeliveryRecordsResponse;
  routeableStepProps: RouteableStepProps;
  subscriptionId: string;
  subscriptionCurrency: string;
  isTestUser: boolean;
}

const renderDeliveryRecordsConfirmation = (
  props: RouteableStepProps,
  productDetail: ProductDetail
) => (data: DeliveryRecordsResponse) => {
  const mainPlan = getMainPlan(
    productDetail.subscription
  ) as PaidSubscriptionPlan;

  return (
    <DeliveryRecordsProblemConfirmationFC
      data={data}
      routeableStepProps={props}
      subscriptionId={productDetail.subscription.subscriptionId}
      subscriptionCurrency={mainPlan.currency}
      isTestUser={productDetail.isTestUser}
    />
  );
};

const DeliveryRecordsProblemConfirmationFC = (
  props: DeliveryRecordsProblemConfirmationFCProps
) => {
  const deliveryIssuePostPayload = useContext(
    DeliveryRecordsProblemPostPayloadContext
  );

  const filterData = (productPartName: ProductUrlPart) => {
    return props.data.results.filter((element, index) => true);
  };
  return (
    <WizardStep
      routeableStepProps={props.routeableStepProps}
      hideBackButton
      fullWidth
    >
      <PageHeaderContainer selectedNavItem={navLinks.subscriptions}>
        <h1>Delivery history</h1>
      </PageHeaderContainer>
      <PageNavAndContentContainer selectedNavItem={navLinks.subscriptions}>
        <h2
          css={css`
            border-top: 1px solid ${palette.neutral["86"]};
            ${headline.small()};
            font-weight: bold;
            ${maxWidth.tablet} {
              font-size: 1.25rem;
              line-height: 1.6;
            }
          `}
        >
          Delivery report confirmation
        </h2>
        {props.data.results.length ? (
          filterData(
            props.routeableStepProps.productType.urlPart
          ).map((deliveryRecord: DeliveryRecordApiItem, listIndex) => (
            <DeliveryRecordCard
              key={deliveryRecord.id}
              deliveryRecord={deliveryRecord}
              listIndex={listIndex}
              pageStatus={PageStatus.REPORT_ISSUE_CONFIRMATION}
              deliveryProblemMap={props.data.deliveryProblemMap}
              recordCurrency={props.subscriptionCurrency}
            />
          ))
        ) : (
          <p>There aren't any delivery records to show you yet</p>
        )}
      </PageNavAndContentContainer>
    </WizardStep>
  );
};

export const DeliveryRecordsProblemConfirmation = (
  props: RouteableStepProps
) => (
  <FlowStartMultipleProductDetailHandler
    {...props}
    headingPrefix={"Delivery report confirmation"}
    hideHeading
    hasLeftNav={{
      pageTitle: "Delivery report confirmation",
      selectedNavItem: navLinks.subscriptions
    }}
    supportRefererSuffix="delivery_records_flow"
    loadingMessagePrefix="Retrieving details of your"
    cancelledExplainer={`This ${props.productType.friendlyName} has been cancelled. You cannot view any of its delivery history.
    Please contact us if you would like to re-start this ${props.productType.friendlyName}, make any amendments or need further help.`}
    singleProductDetailRenderer={(
      routeableStepProps: RouteableStepProps,
      productDetail: ProductDetail
    ) => (
      <DeliveryRecordsApiAsyncLoader
        render={renderDeliveryRecordsConfirmation(props, productDetail)}
        fetch={createDeliveryRecordsFetcher(
          productDetail.subscription.subscriptionId
        )}
        loadingMessage={"Loading delivery history..."}
      />
    )}
  />
);
