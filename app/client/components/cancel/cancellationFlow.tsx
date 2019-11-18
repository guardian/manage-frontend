import { css } from "@emotion/core";
import React from "react";
import {
  MembersDataApiResponseContext,
  ProductDetail
} from "../../../shared/productResponse";
import {
  ProductTypeWithCancellationFlow,
  WithProductType
} from "../../../shared/productTypes";
import { maxWidth } from "../../styles/breakpoints";
import { LinkButton } from "../buttons";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { PageContainerSection } from "../page";
import { RadioButton } from "../radioButton";
import {
  MultiRouteableProps,
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../wizardRouterAdapter";
import { getCancellationSummary } from "./cancellationSummary";

interface ReasonPickerProps
  extends WithProductType<ProductTypeWithCancellationFlow> {
  options: MultiRouteableProps[];
}

interface ReasonPickerState {
  reasonPath: string;
}

class ReasonPicker extends React.Component<
  ReasonPickerProps,
  ReasonPickerState
> {
  public state = {
    reasonPath: ""
  };

  public render(): React.ReactNode {
    return (
      <>
        <h4>Please select a reason</h4>
        <form css={css({ marginBottom: "30px" })}>
          {this.props.options.map((reason: MultiRouteableProps) => (
            <RadioButton
              key={reason.path}
              value={reason.path}
              label={reason.linkLabel}
              checked={reason.path === this.state.reasonPath}
              groupName="reasons"
              onChange={this.getClickHandler(reason.path)}
            />
          ))}
        </form>

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
              disabled={!this.state.reasonPath}
              right
            />
          </div>
          <div>
            <ReturnToYourProductButton productType={this.props.productType} />
          </div>
        </div>
      </>
    );
  }

  private getClickHandler = (reasonPath: string) => () => {
    this.setState({ reasonPath });
  };
}

const extractRouteableProps = (child: { props: MultiRouteableProps }) =>
  child.props;

const reasonsRenderer = (
  routeableStepPropsWithCancellationFlow: RouteableStepPropsWithCancellationFlow
) => (routeableStepProps: RouteableStepProps, productDetail: ProductDetail) => {
  if (productDetail.subscription.cancelledAt) {
    return (
      <div>
        {getCancellationSummary(routeableStepProps.productType)(
          productDetail.subscription
        )}
        <ReturnToYourProductButton {...routeableStepProps} />
      </div>
    );
  }
  return (
    <MembersDataApiResponseContext.Provider value={productDetail}>
      <WizardStep routeableStepProps={routeableStepProps} hideBackButton>
        {
          routeableStepPropsWithCancellationFlow.productType.cancellation
            .startPageBody
        }
        <PageContainerSection>
          <ReasonPicker
            productType={routeableStepPropsWithCancellationFlow.productType}
            options={routeableStepProps.children.props.children.map(
              extractRouteableProps
            )}
          />
        </PageContainerSection>
      </WizardStep>
    </MembersDataApiResponseContext.Provider>
  );
};

export interface RouteableStepPropsWithCancellationFlow
  extends RouteableStepProps {
  productType: ProductTypeWithCancellationFlow;
}

export const CancellationFlow = (
  props: RouteableStepPropsWithCancellationFlow
) => (
  <FlowStartMultipleProductDetailHandler
    {...props}
    headingPrefix="Cancel"
    supportRefererSuffix="cancellation_flow"
    loadingMessagePrefix="Checking the status of your"
    cancelledExplainer={`This ${
      props.productType.friendlyName
    } is already cancelled.`}
    singleProductDetailRenderer={reasonsRenderer(props)}
  />
);
