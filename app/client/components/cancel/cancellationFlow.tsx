import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import React from "react";
import {
  friendlyLongDateFormat,
  momentiseDateStr
} from "../../../shared/dates";
import {
  MembersDataApiItemContext,
  ProductDetail
} from "../../../shared/productResponse";
import { ProductTypeWithCancellationFlow } from "../../../shared/productTypes";
import { maxWidth } from "../../styles/breakpoints";
import { LinkButton } from "../buttons";
import { navLinks } from "../nav";
import {
  PageContainerSection,
  PageHeaderContainer,
  PageNavAndContentContainer
} from "../page";
import { ProductDetailProvider } from "../productDetailProvider";
import { ProgressIndicator } from "../progressIndicator";
import { RadioButton } from "../radioButton";
import {
  MultiRouteableProps,
  ReturnToAccountOverviewButton,
  RouteableStepProps,
  WizardStep
} from "../wizardRouterAdapter";
import {
  cancellationEffectiveEndOfLastInvoicePeriod,
  cancellationEffectiveToday,
  CancellationPolicyContext
} from "./cancellationContexts";

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
              <ReturnToAccountOverviewButton />
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
          <WizardStep routeableStepProps={this.props}>
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
                {innerContent}
              </PageNavAndContentContainer>
            </>
          </WizardStep>
        </CancellationPolicyContext.Provider>
      </MembersDataApiItemContext.Provider>
    );
  }
}

export const CancellationFlow = (
  props: RouteableStepPropsWithCancellationFlow
) => (
  <ProductDetailProvider
    {...props}
    loadingMessagePrefix="Checking the status of your"
  >
    {productDetail => <ReasonPicker {...props} productDetail={productDetail} />}
  </ProductDetailProvider>
);
