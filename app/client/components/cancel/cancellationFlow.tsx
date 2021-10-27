import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import React from "react";
import { DATE_FNS_LONG_OUTPUT_FORMAT, parseDate } from "../../../shared/dates";
import {
  MembersDataApiItemContext,
  ProductDetail
} from "../../../shared/productResponse";
import { ProductTypeWithCancellationFlow } from "../../../shared/productTypes";
import { hasCancellationFlow } from "../../productUtils";
import { maxWidth } from "../../styles/breakpoints";
import { LinkButton } from "../buttons";
import { FlowWrapper } from "../FlowWrapper";
import { NAV_LINKS } from "../nav/navConfig";
import { ProgressIndicator } from "../progressIndicator";
import { RadioButton } from "../radioButton";
import { WithStandardTopMargin } from "../WithStandardTopMargin";
import {
  ReturnToAccountOverviewButton,
  RouteableStepProps,
  WizardStep
} from "../wizardRouterAdapter";
import {
  cancellationEffectiveEndOfLastInvoicePeriod,
  cancellationEffectiveToday,
  CancellationPolicyContext
} from "./cancellationContexts";
import { CancellationDateResponse } from "./cancellationDateResponse";
import { CancellationReason } from "./cancellationReason";
import { ContactUsToCancel } from "./contactUsToCancel";
import { GenericSaveAttemptProps } from "./stages/genericSaveAttempt";
import DataFetcher from "../DataFetcher";
import { credentialHeaders, fetcher } from "../../fetchClient";
import useSWR from "swr";
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../../../shared/identity";

export interface RouteableStepPropsWithCancellationFlow
  extends RouteableStepProps {
  productType: ProductTypeWithCancellationFlow;
}

interface ReasonPickerProps extends RouteableStepPropsWithCancellationFlow {
  productDetail: ProductDetail;
  chargedThroughCancellationDate: string;
}

interface ReasonPickerState {
  reasonPath: string;
  cancellationPolicy?: string;
}

const shouldShow = (reason: CancellationReason, productDetail: ProductDetail) =>
  reason.shouldShow ? reason.shouldShow(productDetail) : true;

class ReasonPicker extends React.Component<
  ReasonPickerProps,
  ReasonPickerState
> {
  public state: ReasonPickerState = {
    reasonPath: ""
  };

  public render(): React.ReactNode {
    // offer choice if not trial period or lead time, and startPageOfferEffectiveDateOptions config set to true
    const shouldOfferEffectiveDateOptions =
      !isNaN(Date.parse(this.props.chargedThroughCancellationDate)) &&
      this.props.productType.cancellation.startPageOfferEffectiveDateOptions;

    const chargedThroughDateStr =
      shouldOfferEffectiveDateOptions &&
      parseDate(this.props.chargedThroughCancellationDate).dateStr(
        DATE_FNS_LONG_OUTPUT_FORMAT
      );

    // we extract the options from the children rather than direct from the ProductType to guarantee the routes are setup correctly
    const options = this.props.children.props.children.map(
      (child: { props: GenericSaveAttemptProps }) => child.props
    );

    const innerContent = (
      <>
        <ProgressIndicator
          steps={[
            { title: "Reason", isCurrentStep: true },
            { title: "Review" },
            { title: "Confirmation" }
          ]}
          additionalCSS={css`
            margin: ${space[5]}px 0 ${space[12]}px;
          `}
        />
        {this.props.productType.cancellation.startPageBody(
          this.props.productDetail
        )}
        <WithStandardTopMargin>
          <h4>Please select a reason</h4>
          <form css={css({ marginBottom: "30px" })}>
            {options.map(
              (reason: GenericSaveAttemptProps) =>
                shouldShow(reason.reason, this.props.productDetail) && (
                  <RadioButton
                    key={reason.path}
                    value={reason.path}
                    label={reason.linkLabel}
                    checked={reason.path === this.state.reasonPath}
                    groupName="reasons"
                    onChange={() => this.setState({ reasonPath: reason.path })}
                  />
                )
            )}
          </form>

          {shouldOfferEffectiveDateOptions && (
            <>
              <h4>
                When would you like your cancellation to become effective?
              </h4>
              <form css={css({ marginBottom: "30px" })}>
                <RadioButton
                  value="EndOfLastInvoicePeriod"
                  label={`On ${chargedThroughDateStr}, which is the end of your current billing period (you should not be charged again)`}
                  checked={
                    this.state.cancellationPolicy ===
                    cancellationEffectiveEndOfLastInvoicePeriod
                  }
                  groupName="cancellationPolicy"
                  onChange={() =>
                    this.setState({
                      cancellationPolicy: cancellationEffectiveEndOfLastInvoicePeriod
                    })
                  }
                />
                <RadioButton
                  value="Today"
                  label="Today"
                  checked={
                    this.state.cancellationPolicy === cancellationEffectiveToday
                  }
                  groupName="cancellationPolicy"
                  onChange={() =>
                    this.setState({
                      cancellationPolicy: cancellationEffectiveToday
                    })
                  }
                />
              </form>
            </>
          )}

          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row-reverse",
              [maxWidth.mobileLandscape]: {
                flexDirection: "column"
              }
            }}
          >
            <div
              css={{
                textAlign: "right",
                marginBottom: "10px"
              }}
            >
              <LinkButton
                text="Continue"
                to={this.state.reasonPath}
                disabled={
                  !this.state.reasonPath ||
                  (shouldOfferEffectiveDateOptions &&
                    !this.state.cancellationPolicy)
                }
                right
              />
            </div>
            <div>
              <ReturnToAccountOverviewButton />
            </div>
          </div>
        </WithStandardTopMargin>
      </>
    );

    return (
      <MembersDataApiItemContext.Provider value={this.props.productDetail}>
        <CancellationPolicyContext.Provider
          value={this.state.cancellationPolicy}
        >
          <WizardStep routeableStepProps={this.props}>
            {innerContent}
          </WizardStep>
        </CancellationPolicyContext.Provider>
      </MembersDataApiItemContext.Provider>
    );
  }
}

interface ReasonPickerRenderer {
  routeableStepProps: RouteableStepProps;
  productType: ProductTypeWithCancellationFlow;
  productDetail: ProductDetail;
}

const headers = {
  method: "GET",
  ...credentialHeaders,
  [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
    window.location.href
  )
};

const ReasonPickerRenderer = ({
  routeableStepProps,
  productType,
  productDetail
}: ReasonPickerRenderer) => {
  const apiResponse = useSWR(
    [
      "/api/cancellation-date/" + productDetail.subscription.subscriptionId,
      headers
    ],
    fetcher,
    { suspense: true }
  ).data as CancellationDateResponse;

  return (
    <ReasonPicker
      {...routeableStepProps}
      productType={productType}
      productDetail={productDetail}
      chargedThroughCancellationDate={apiResponse.cancellationEffectiveDate}
    />
  );
};

const CancellationFlow = (props: RouteableStepProps) => (
  <FlowWrapper
    {...props}
    loadingMessagePrefix="Checking the status of your"
    selectedNavItem={NAV_LINKS.accountOverview}
    pageTitle={`Cancel ${props.productType.shortFriendlyName ||
      props.productType.friendlyName}`}
    breadcrumbs={[
      {
        title: NAV_LINKS.accountOverview.title,
        link: NAV_LINKS.accountOverview.link
      },
      {
        title: `Cancel ${props.productType.friendlyName}`,
        currentPage: true
      }
    ]}
  >
    {productDetail =>
      productDetail.selfServiceCancellation.isAllowed &&
      hasCancellationFlow(props.productType) ? (
        <DataFetcher
          loadingMessage={`Checking your ${props.productType
            .shortFriendlyName || props.productType.friendlyName} details...`}
        >
          <ReasonPickerRenderer
            routeableStepProps={props}
            productType={props.productType}
            productDetail={productDetail}
          />
        </DataFetcher>
      ) : (
        <ContactUsToCancel
          selfServiceCancellation={productDetail.selfServiceCancellation}
          subscriptionId={productDetail.subscription.subscriptionId}
          productType={props.productType}
        />
      )
    }
  </FlowWrapper>
);

export default CancellationFlow;
