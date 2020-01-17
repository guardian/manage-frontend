import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import React from "react";
import { ProductDetail } from "../../../../shared/productResponse";
import { maxWidth } from "../../../styles/breakpoints";
import { FlowStartMultipleProductDetailHandler } from "../../flowStartMultipleProductDetailHandler";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { RouteableStepProps } from "../../wizardRouterAdapter";
import {
  createDeliveryRecordsFetcher,
  DeliveryRecordsApiAsyncLoader,
  DeliveryRecordsResponse
} from "./deliveryRecordsApi";
import { RecordsTable } from "./deliveryRecordsTable";

const renderDeliveryRecords = (props: RouteableStepProps) => (
  data: DeliveryRecordsResponse
) => (
  <>
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
        {props.productType.friendlyName}
      </h2>
      <RecordsTable
        data={data.results}
        deliveryProblemMap={data.deliveryProblemMap}
        showDeliveryInstructions={
          props.productType.delivery?.showDeliveryInstructions
        }
        resultsPerPage={7}
      />
    </PageNavAndContentContainer>
  </>
);

export const DeliveryRecords = (props: RouteableStepProps) => (
  <FlowStartMultipleProductDetailHandler
    {...props}
    headingPrefix={"View delivery history"}
    hideHeading
    hasLeftNav={{
      pageTitle: "Delivery history",
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
        render={renderDeliveryRecords(props)}
        fetch={createDeliveryRecordsFetcher(
          productDetail.subscription.subscriptionId
        )}
        loadingMessage={"Loading delivery history..."}
      />
    )}
  />
);
