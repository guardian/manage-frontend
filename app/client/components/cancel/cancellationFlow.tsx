import React, { ChangeEvent, ReactNode } from "react";
import {
  MembersDataApiResponseContext,
  ProductDetail
} from "../../../shared/productResponse";
import {
  ProductTypeWithCancellationFlow,
  WithProductType
} from "../../../shared/productTypes";
import palette from "../../colours";
import { maxWidth } from "../../styles/breakpoints";
import { LinkButton } from "../buttons";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { PageContainerSection } from "../page";
import {
  MultiRouteableProps,
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../wizardRouterAdapter";
import { getCancellationSummary } from "./cancellationSummary";

interface ReasonPickerProps
  extends WithProductType<ProductTypeWithCancellationFlow> {
  options: ReactNode[];
}

interface ReasonPickerState {
  reasonPath: string;
}

const cssInheritFont = {
  fontSize: "inherit",
  fontFamily: "inherit"
};

class ReasonPicker extends React.Component<
  ReasonPickerProps,
  ReasonPickerState
> {
  constructor(props: ReasonPickerProps) {
    super(props);
    this.state = {
      reasonPath: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    this.setState({ reasonPath: event.target.value });
  }

  public render(): React.ReactNode {
    return (
      <>
        <div css={{ marginBottom: "20px" }}>
          <select
            value={this.state.reasonPath}
            onChange={this.handleChange}
            css={{
              ...cssInheritFont,
              width: "100%",
              height: "32px",
              border: "1px black solid",
              color: this.state.reasonPath ? undefined : palette.neutral["4"],
              appearance: "menulist"
              // TODO fix the clipping of font top/bottom because of font-size
            }}
          >
            <option disabled value="">
              Please select a reason
            </option>
            {this.props.options}
          </select>
        </div>
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
}

const childWithRouteablePropsToElement = (child: {
  props: MultiRouteableProps;
}) => (
  <option key={child.props.path} value={child.props.path} css={cssInheritFont}>
    {child.props.linkLabel || child.props.path}
  </option>
);

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
              childWithRouteablePropsToElement
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
    singleProductDetailRenderer={reasonsRenderer(props)}
  />
);
