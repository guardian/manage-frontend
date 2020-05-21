import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import React, { useContext } from "react";
import {
  friendlyLongDateFormat,
  momentiseDateStr
} from "../../../shared/dates";
import {
  MembersDataApiItemContext,
  ProductDetail
} from "../../../shared/productResponse";
import { ProductTypeWithCancellationFlow } from "../../../shared/productTypes";
import { IsInAccountOverviewContext } from "../../accountOverviewRelease";
import { maxWidth } from "../../styles/breakpoints";
import { LinkButton } from "../buttons";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { navLinks } from "../nav";
import {
  PageContainerSection,
  PageHeaderContainer,
  PageNavAndContentContainer
} from "../page";
import { ProgressIndicator } from "../progressIndicator";
import { RadioButton } from "../radioButton";
import {
  MultiRouteableProps,
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../wizardRouterAdapter";
import {
  cancellationEffectiveEndOfLastInvoicePeriod,
  cancellationEffectiveToday,
  CancellationPolicyContext
} from "./cancellationContexts";
import { getCancellationSummary } from "./cancellationSummary";

export interface RouteableStepPropsWithCancellationFlow
  extends RouteableStepProps {
  productType: ProductTypeWithCancellationFlow;
}

interface ReasonPickerProps extends RouteableStepPropsWithCancellationFlow {
  productDetail: ProductDetail;
}

interface ReasonPickerState {
  reasonPath: string;
  cancellationPolicy?: string;
}

class ReasonPicker extends React.Component<
  ReasonPickerProps,
  ReasonPickerState
> {
  public state: ReasonPickerState = {
    reasonPath: ""
  };

  public render(): React.ReactNode {
    const chargedThroughDate: string | null = this.props.productDetail
      .subscription.chargedThroughDate;

    const shouldOfferEffectiveDateOptions =
      !!chargedThroughDate &&
      this.props.productType.cancellation.startPageOfferEffectiveDateOptions;

    const chargedThroughDateStr =
      chargedThroughDate &&
      momentiseDateStr(chargedThroughDate).format(friendlyLongDateFormat);

    // we extract the options from the children rather than direct from the ProductType to guarantee the routes are setup correctly
    const options = this.props.children.props.children.map(
      (child: { props: MultiRouteableProps }) => child.props
    );

    const innerContent = () => (
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
          this.props.productDetail.subscription
        )}
        <PageContainerSection>
          <h4>Please select a reason</h4>
          <form css={css({ marginBottom: "30px" })}>
            {options.map((reason: MultiRouteableProps) => (
              <RadioButton
                key={reason.path}
                value={reason.path}
                label={reason.linkLabel}
                checked={reason.path === this.state.reasonPath}
                groupName="reasons"
                onChange={() => this.setState({ reasonPath: reason.path })}
              />
            ))}
          </form>

          {shouldOfferEffectiveDateOptions && (
            <>
              <h4>
                When would you like your cancellation to become effective?
              </h4>
              <form css={css({ marginBottom: "30px" })}>
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
              {useContext(IsInAccountOverviewContext) ? (
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
                  productType={this.props.productType}
                />
              )}
            </div>
          </div>
        </PageContainerSection>
      </>
    );

    return (
      <MembersDataApiItemContext.Provider value={this.props.productDetail}>
        <CancellationPolicyContext.Provider
          value={this.state.cancellationPolicy}
        >
          <WizardStep
            routeableStepProps={this.props}
            hideBackButton
            {...(useContext(IsInAccountOverviewContext)
              ? { fullWidth: true }
              : {})}
          >
            {useContext(IsInAccountOverviewContext) ? (
              <>
                <PageHeaderContainer
                  title={`Cancel ${this.props.productType.friendlyName}`}
                  breadcrumbs={[
                    {
                      title: navLinks.accountOverview.title,
                      link: navLinks.accountOverview.link
                    },
                    {
                      title: "Cancel membership",
                      currentPage: true
                    }
                  ]}
                />
                <PageNavAndContentContainer
                  selectedNavItem={navLinks.accountOverview}
                >
                  {innerContent()}
                </PageNavAndContentContainer>
              </>
            ) : (
              innerContent()
            )}
          </WizardStep>
        </CancellationPolicyContext.Provider>
      </MembersDataApiItemContext.Provider>
    );
  }
}

const reasonsRenderer = (
  routeableStepPropsWithCancellationFlow: RouteableStepPropsWithCancellationFlow
) => (_: RouteableStepProps, productDetail: ProductDetail) => {
  if (productDetail.subscription.cancelledAt) {
    return (
      <div>
        {getCancellationSummary(
          routeableStepPropsWithCancellationFlow.productType
        )(productDetail)}
        <ReturnToYourProductButton
          {...routeableStepPropsWithCancellationFlow}
        />
      </div>
    );
  }
  return (
    <ReasonPicker
      {...routeableStepPropsWithCancellationFlow}
      productDetail={productDetail}
    />
  );
};

export const CancellationFlow = (
  props: RouteableStepPropsWithCancellationFlow
) => (
  <FlowStartMultipleProductDetailHandler
    {...props}
    headingPrefix="Cancel"
    hideHeading
    {...(useContext(IsInAccountOverviewContext)
      ? {
          hasLeftNav: {
            pageTitle: "Manage contribution",
            selectedNavItem: navLinks.subscriptions
          }
        }
      : {})}
    supportRefererSuffix="cancellation_flow"
    loadingMessagePrefix="Checking the status of your"
    cancelledExplainer={`This ${props.productType.friendlyName} has been cancelled. Please contact us if you would like to re-start this ${props.productType.friendlyName}, make any amendments or need further help.`}
    singleProductDetailRenderer={reasonsRenderer(props)}
  />
);
